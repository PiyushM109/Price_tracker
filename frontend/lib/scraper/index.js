import axios from "axios";
import { getToken } from "../../src/lib/authUtil";
const scrapeAmazonProduct = async (url) => {
  if (!url) {
    return;
  }

  try {
    const token = getToken();
    const response = await axios.get(`/data/scrape?url=${url}`, {
      headers: {
        authorization: `bearer ${token}`,
      },
    });
    return response.data;
  } catch (e) {
    throw new Error(`Failed to scrape product: ${e.message}`);
  }
};

export default scrapeAmazonProduct;
