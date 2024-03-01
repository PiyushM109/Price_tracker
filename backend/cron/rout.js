const axios = require("axios");
const cheerio = require("cheerio");
const {extractPrice, extractCurrency } = require("../extractor.js")
const Product = require("../models/amazonProduct.js");
const {
    getLowestPrice,
    getHighestPrice,
    getAveragePrice,
    getEmailNotifType,
  } = require("../utils.js");
const { generateEmailBody, sendEmail } = require("../nodeMailer/node_mailer.js");

const scrapeAmazonProduct = async(url)=>{
  if (!url) return;

  // BrightData proxy configuration
  const username = process.env.BRIGHT_DATA_USERNAME;
  const password = process.env.BRIGHT_DATA_PASSWORD;
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
    // Fetch the product page
    const response = await axios.get(url, options);
    const $ = cheerio.load(response.data);

    // Extract the product title
    const title = $("#productTitle").text().trim();
    const currPrice = extractPrice(
      $(".priceToPay span.a-price-whole"),
      $("a.size.base.a-color-price"),
      $(".a-button-selected .a-color-base"),
      $(".a-price.a-text-price")
    );

    const originalPrice = extractPrice(
      $("#priceblock_ourprice"),
      $(".a-price.a-text-price span.a-offscreen"),
      $("#listprice"),
      $("#priceblock_dealprice"),
      $(".a-size-base.a-color-price")
    );

    const outOfStock =
    $("#availability  span.a-size-medium.a-color-success")
      .text()
      .trim()
      .toLowerCase() === "currently unavailable.";

    const images =
    $("#imgBlkFront").attr("data-a-dynamic-image") ||
    $("#landingImage").attr("data-a-dynamic-image");

    const imageUrls = Object.keys(JSON.parse(images));

    const currency = extractCurrency($(".a-price-symbol"));
    const discountRate = $(".savingsPercentage").text().replace(/[-%]/g, "");


    // Construct data object with scraped information
    const data = {
      url,
      currency,
      image: imageUrls[0],
      title,
      currPrice: Number(currPrice) || Number(originalPrice),
      originalPrice: Number(originalPrice) || Number(currPrice),
      priceHistory: [],
      discountRate: Number(discountRate),
      reviewsCount: 578,
      stars: 4.2,
      isOutOfStock: outOfStock,
      lowestPrice: Number(currPrice) || Number(originalPrice),
      highestPrice: Number(originalPrice),
    };

    return data;
  } catch (error) {
    console.log(error);
  }
}


const updater = async () => {
  try {
    // console.log("Piyush1");
    const products = await Product.find();
    if (!products) throw new Error("No Product Found");
    //SCRAPE latest details and update the db
    const updatedProducts = await Promise.all(
      products.map(async (currentProduct) => {
        try {
          const scrapedProduct = await scrapeAmazonProduct(currentProduct.url);
          console.log(scrapedProduct);
          if (!scrapedProduct) throw new Error("No Product Found");
          console.log("piyush2");
          const updatedPriceHistory = [
            ...currentProduct.priceHistory,
            {
              price: scrapedProduct.currPrice,
              date: Date.now(),
            },
          ];
          // console.log("piyush3");
          const product = {
            ...scrapedProduct,
            priceHistory: updatedPriceHistory,
            lowestPrice: getLowestPrice(updatedPriceHistory),
            highestPrice: getHighestPrice(updatedPriceHistory),
            averagePrice: getAveragePrice(updatedPriceHistory),
          };
          // console.log(product);
          // console.log("piyush4");

          // Update Products in DB
          const updatedProduct = await Product.findOneAndUpdate(
            {
              url: product.url,
            },
            product
          );
          console.log(updatedProduct);
          console.log("piyush5");

          const emailNotifyType = getEmailNotifType(scrapedProduct, currentProduct);
          console.log(emailNotifyType);
          if (emailNotifyType && updatedProduct.users.length > 0) {
            const productInfo = {
              title: updatedProduct.title,
              url: updatedProduct.url,
            };

            const emailContent = await generateEmailBody(productInfo, emailNotifyType);

            const userEmails = updatedProduct.users.map((user) => user.email);
            // console.log("Piyush6"); // Adding new print statement to debug

            await sendEmail(emailContent, userEmails);
          }
          // console.log("Piyush7"); // Adding new print statement to debug

          return updatedProduct;
        } catch (error) {
          console.error("Error occurred during product update:", error); // Log error
          throw error; // Rethrow error to bubble up
        }
      })
    );
      console.log(updatedProducts);
    return {
      message: 'OK',
      data: updatedProducts
    };
  } catch (e) {
    console.error("Error occurred during product processing:", e); // Log error
    throw new Error(`Error in GET ${e}`);
  }
};


module.exports = {
    updater
}
