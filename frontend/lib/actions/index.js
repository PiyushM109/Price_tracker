import scrapeAmazonProduct from "../scraper";

const scrapeAndStoreProduct = async (productUrl) => {
  if (!productUrl) {
    return;
  }

  try {
    const scrapedProduct = await scrapeAmazonProduct(productUrl);
    console.log(scrapedProduct);
    return scrapedProduct;
  } catch (e) {
    throw new Error(`Failed to create/update product ${e}`);
  }
};

export default scrapeAndStoreProduct;
