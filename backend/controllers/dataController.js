const axios = require("axios");
const { dataExtractor } = require("../utils/extractor.js");
const Product = require("../models/amazonProduct.js");
const User = require("../models/user.js");
const {
  getLowestPrice,
  getHighestPrice,
  getAveragePrice,
} = require("../utils/price-utils.js");
const {
  generateEmailBody,
  sendEmail,
} = require("../nodeMailer/node_mailer.js");

const scrapeData = async (req, res, next) => {
  const url = req.query.url;
  // console.log(url);
  const username = String(process.env.BRIGHT_DATA_USERNAME);
  const password = String(process.env.BRIGHT_DATA_PASSWORD);

  const port = 22225;
  const session_id = (1000000 * Math.random()) | 0;
  const options = {
    auth: {
      username: `${username}-session-${session_id}`,
      password,
    },
    host: "brd.superproxy.io",
    port,
    rejectUnauthorized: false,
  };

  try {
    const response = await axios.get(url, options);
    const data = await dataExtractor(response, url);
    // console.log(data);
    let productData = { ...data };
    // console.log(productData);
    const existingProduct = await Product.findOne({ url: data.url });
    // console.log(existingProduct);

    if (existingProduct) {
      let updatedPriceHistory = existingProduct.priceHistory.push({
        price: data.currPrice,
        date: Date.now(),
      });

      // console.log(existingProduct.priceHistory);

      (existingProduct.lowestPrice = getLowestPrice(
        existingProduct.priceHistory
      )),
        (existingProduct.highestPrice = getHighestPrice(
          existingProduct.priceHistory
        )),
        (existingProduct.averagePrice = getAveragePrice(
          existingProduct.priceHistory
        ));

      // console.log(existingProduct);
      productData = existingProduct;
      // console.log(productData);
    }

    const newProduct = await Product.findOneAndUpdate(
      { url: data.url },
      productData,
      { upsert: true, new: true }
    );

    // If user is authenticated, add product to their tracked products
    if (req.user) {
      // Add user to product's users array if not already there
      if (!newProduct.users.includes(req.user.id)) {
        newProduct.users.push(req.user.id);
        await newProduct.save();
      }

      // Add product to user's products array if not already there
      const user = await User.findById(req.user.id);
      if (!user.products.includes(newProduct._id)) {
        user.products.push(newProduct._id);
        await user.save();
      }
    }

    // console.log(newProduct);

    res.send(newProduct);
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
    res.status(200).json({
      success: true,
      products: user.products,
    });
  } catch (err) {
    next(err);
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
};
