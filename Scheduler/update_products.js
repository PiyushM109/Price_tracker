const Product = require("./models/Product");
const axios = require("axios");
const mailSender = require("./mail-services/nodeMailer");
const generateEmailBody = require("./mail-services/mail-util");

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const updateProducts = async () => {
  try {
    const allProducts = await Product.find({}).populate("users");

    for (const product of allProducts) {
      const url = product.url;
      if (!url) {
        continue;
      }
      const response = await axios.post(process.env.SCRAPPER_URL, {
        url,
      });

      const priceData = response.data.data;

      if (!priceData.success) {
        continue;
      }

      const updatedPriceHistory = [
        ...product.priceHistory,
        { price: priceData.currPrice },
      ];

      await Product.findByIdAndUpdate(product._id, {
        priceHistory: updatedPriceHistory,
        reviewsCount: priceData.reviewsCount,
        stars: priceData.stars,
        currPrice: priceData.currPrice,
        lowestPrice: Math.min(product.lowestPrice, priceData.currPrice),
        isOutOfStock: priceData.isOutOfStock,
        highestPrice: Math.max(product.highestPrice, priceData.currPrice),
        averagePrice:
          updatedPriceHistory.reduce((acc, curr) => acc + curr.price, 0) /
          updatedPriceHistory.length,
      });
      const productInfo = {
        title: product.title,
        url: product.url,
      };
      if (product.isOutOfStock && !priceData.isOutOfStock) {
        console.log("change of stock");
        const { subject, body } = await generateEmailBody(
          productInfo,
          "CHANGE OF STOCK"
        );
        const userEmails = product.users.map((user) => user.email);
        await mailSender(userEmails, subject, body);
      } else if (product.lowestPrice > priceData.currPrice) {
        console.log("lowest price");
        const { subject, body } = await generateEmailBody(
          productInfo,
          "LOWEST PRICE"
        );
        const userEmails = product.users.map((user) => user.email);
        await mailSender(userEmails, subject, body);
      }
      // console.log({ product, priceData });
      await delay(2000); // 5-second delay
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = updateProducts;
