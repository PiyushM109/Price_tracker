import axios from "axios";
const scrapeAmazonProduct = async (url) => {
  if (!url) {
    return;
  }

  try {
    const response = await axios.get(`http://localhost:3000/scrape?url=${url}`, {
      withCredentials: true
    });
    return response.data;
  } catch (e) {
    throw new Error(`Failed to scrape product: ${e.message}`);
  }
};

export default scrapeAmazonProduct;
