import axios from "axios";
const scrapeAmazonProduct = async (url) => {
  if (!url) {
    return;
  }

  try {
    const response = await axios.get(`https://price-tracker-server-cyan.vercel.app/scrape?url=${url}`);
    return response.data;
  } catch (e) {
    throw new Error(`Failed to scrape product: ${e.message}`);
  }
};

export default scrapeAmazonProduct;
