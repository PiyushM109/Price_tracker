const express = require("express");
const axios = require("axios");
const cors = require("cors");
const { dataExtractor } = require("./extractor.js");
const Product = require("./models/amazonProduct.js");
const dotenv = require("dotenv").config();
const cron = require("node-cron");
const connectDB = require("./services/DB_Connect.js");
const {
  getLowestPrice,
  getHighestPrice,
  getAveragePrice,
} = require("./utils.js");
const { generateEmailBody, sendEmail } = require("./nodeMailer/node_mailer.js");
const { updater } = require("./cron/rout.js");
const app = express();
app.use(cors());
app.use(express.json());

app.get("/scrape", async (req, res) => {
  const url = req.query.url;
  console.log(url);
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
    console.log(data);
    let productData = { ...data };
    console.log(productData);
    const existingProduct = await Product.findOne({ url: data.url });
    console.log(existingProduct);

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

      console.log(existingProduct);
      productData = existingProduct;
      console.log(productData);
    }

    const newProduct = await Product.findOneAndUpdate(
      { url: data.url },
      productData,
      { upsert: true, new: true }
    );

    console.log(newProduct);

    res.send(newProduct);
  } catch (e) {
    console.log(e);
    res.send(`Failed to scrape product: ${e}`);
  }
});

app.get("/allProduct", async (req, res) => {
  const allProduct = await Product.find({});
  res.send(allProduct);
});

app.get("/product/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (product) {
      res.send(product);
    }
  } catch (err) {
    res.sendStatus(404);
  }
});

app.post("/product/addEmail", async (req, res) => {
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
});

// cron.schedule("*/2 * * * *", updater);

// updater();

const main = async () => {
  try {
    await connectDB();
    app.listen(3000, () => {
      console.log(`Proxy server is running on port 3000`);
    });
  } catch (error) {
    console.log(error);
  }
};

main();
