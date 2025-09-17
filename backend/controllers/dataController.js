const axios = require("axios");
const { dataExtractor } = require("../utils/extractor.js");
const Product = require("../models/amazonProduct.js");
const User = require("../models/user.js");
const {
  getLowestPrice,
  getHighestPrice,
  getAveragePrice,
} = require("../utils/price-utils.js");
const generateEmailBody = require("../nodeMailer/mail_util.js");
const mailSender = require("../nodeMailer/node_mailer.js");

const scrapeData = async (req, res, next) => {
  const url = req.query.url;

  try {
    const rsp = await axios.post("http://localhost:3001/getProduct", {
      url,
    });
    let data = rsp.data.data;
    // console.log({ data: rsp.data.data });
    let productData = { ...data };
    // console.log(productData);
    const existingProduct = await Product.findOne({ url: data.url });
    // console.log(existingProduct);

    // if (existingProduct) {
    //   let updatedPriceHistory = existingProduct.priceHistory.push({
    //     price: data.currPrice,
    //     date: Date.now(),
    //   });

    //   console.log(existingProduct.priceHistory);

    //   (existingProduct.lowestPrice = getLowestPrice(
    //     existingProduct.priceHistory
    //   )),
    //     (existingProduct.highestPrice = getHighestPrice(
    //       existingProduct.priceHistory
    //     )),
    //     (existingProduct.averagePrice = getAveragePrice(
    //       existingProduct.priceHistory
    //     ));

    //   // console.log(existingProduct);
    //   productData = existingProduct;
    //   // console.log(productData);
    // }

    // const newProduct = await Product.findOneAndUpdate(
    //   { url: data.url },
    //   productData,
    //   { upsert: true, new: true }
    // );

    // // If user is authenticated, add product to their tracked products
    // if (req.user) {
    //   // Add user to product's users array if not already there
    //   if (!newProduct.users.includes(req.user.id)) {
    //     newProduct.users.push(req.user.id);
    //     await newProduct.save();
    //   }

    //   // Add product to user's products array if not already there
    //   const user = await User.findById(req.user.id);
    //   if (!user.products.includes(newProduct._id)) {
    //     user.products.push(newProduct._id);
    //     await user.save();
    //   }
    // }

    // // console.log(newProduct);

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
    console.log(user);
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
//need to work on this
const addEmail = async (req, res) => {
  const { userEmail, prodId } = req.body;
  Product.findById(prodId)
    .then(async (doc) => {
      if (!doc) {
        throw new Error("Document not found");
      }
      const emailExists = doc.users.some((user) => user.email === userEmail);
      if (emailExists) {
        console.log("Email already exists in the users array");
        res
          .status(500)
          .send({ message: "Email already exists in the users array" }); // Send response here
        return;
      } else {
        // Step 3: If email doesn't exist, add it to the users array
        doc.users.push({ email: userEmail });
      }
      const emailContent = await generateEmailBody(doc, "WELCOME");
      console.log(emailContent);
      await sendEmail(emailContent, [userEmail]);
      return doc.save();
    })
    .then((updatedDoc) => {
      if (updatedDoc) {
        console.log("User email added to users array:", updatedDoc);
        res.send(updatedDoc); // Send response here
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      res.status(500).send({ error: "Internal server error" }); // Send error response here
    });
};

module.exports = {
  scrapeData,
  getAllProducts,
  getProductById,
  getUserProducts,
  addEmail,
  startTracking,
};
