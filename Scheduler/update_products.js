const Product = require("./models/Product");
const axios = require("axios");

const updateProduct = async () => {
  try {
    const allProducts = await Product.find({});

    for (const product of allProducts) {
      const url = product.url;
      if (!url) {
        continue;
      }
      const priceData = await axios.get("http://localhost:3000/getProduct", {
        url,
      });
      if (!priceData.success) {
        constinue;
      }
      const updatedProduct = await Product.findByIdAndUpdate(product._id, {
        priceHistory: product.priceHistory.push(priceData.currPrice),
        reviewsCount: priceData.reviewsCount,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
