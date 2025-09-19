const axios = require("axios");
const Product = require("../models/amazonProduct.js");
const User = require("../models/user.js");
const generateEmailBody = require("../nodeMailer/mail_util.js");
const mailSender = require("../nodeMailer/node_mailer.js");

const scrapeData = async (req, res, next) => {
  const url = req.query.url;

  try {
    const rsp = await axios.post(process.env.SCRAPPER_URL, {
      url,
    });
    let data = rsp.data.data;
    let productData = { ...data };
    res.send(productData);
  } catch (e) {
    console.log(e);
    next(e);
  }
};

const getAllProducts = async (req, res, next) => {
  try {
    const allProducts = await await Product.find()
      .sort({ createdAt: -1 })
      .limit(6);
    res.status(200).json({
      success: true,
      allProducts,
    });
  } catch (error) {
    next(error);
  }
};

const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      const error = new Error("product not found");
      error.status = 404;
      throw error;
    }
    res.status(200).json({
      success: true,
      product,
    });
  } catch (err) {
    next(err);
  }
};

const getUserProducts = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).populate("products");
    // console.log(user);
    res.status(200).json({
      success: true,
      products: user.products,
    });
  } catch (err) {
    next(err);
  }
};

const startTracking = async (req, res, next) => {
  try {
    const user = req.user;
    const { product } = req.body;
    if (!product) {
      res.status(404).json({
        success: false,
        message: "Product Data not found",
      });
      return;
    }
    const { subject, body } = await generateEmailBody(product, "WELCOME");
    // console.log(subject, body);
    const info = mailSender(user.email, subject, body);
    const existingProduct = await Product.findOne({ url: product.url });
    if (existingProduct) {
      const updated = await Product.findByIdAndUpdate(
        existingProduct._id,
        { $addToSet: { users: user.id } },
        { new: true }
      );
      await User.findByIdAndUpdate(user.id, {
        $addToSet: { products: updated._id },
      });
      res.status(200).json({
        success: true,
        message: "product added successfully",
        product: updated,
      });
    }
    const newProduct = await Product.create({
      ...product,
      users: [user.id],
    });
    const update = await User.findByIdAndUpdate(user.id, {
      $addToSet: { products: newProduct._id },
    });
    // console.log({ update });
    res.status(200).json({
      success: true,
      message: "product added successfully",
      product: newProduct,
    });
  } catch (error) {
    next(error);
  }
};
const addEmail = async (req, res, next) => {
  try {
    const { userEmail, prodId } = req.body;
    const doc = await Product.findById(prodId);

    if (!doc) {
      const error = new Error("Document not found");
      error.status = 404;
      throw error;
    }

    const emailExists = doc.users.some((user) => user.email === userEmail);
    if (emailExists) {
      return res
        .status(400)
        .json({ message: "Email already exists in the users array" });
    }

    doc.users.push({ email: userEmail });

    const emailContent = await generateEmailBody(doc, "WELCOME");
    await mailSender(userEmail, emailContent.subject, emailContent.body);

    const updatedDoc = await doc.save();

    res.json(updatedDoc);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  scrapeData,
  getAllProducts,
  getProductById,
  getUserProducts,
  addEmail,
  startTracking,
};
