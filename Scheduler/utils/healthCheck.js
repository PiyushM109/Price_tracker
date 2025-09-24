const axios = require("axios");

// TODO: Move these URLs to a .env file
const SCRAPER_URL = process.env.SCRAPER_URL;

let servicesReady = false;

const checkService = async (url) => {
  try {
    const response = await axios.get(`${url}/health`);
    return response.status === 200;
  } catch (error) {
    return false;
  }
};

const waitForServices = async () => {
  let scraperReady = false;
  let schedulerReady = false;

  while (!scraperReady) {
    console.log("Checking service health...");
    scraperReady = await checkService(SCRAPER_URL);

    if (scraperReady) {
      console.log("All services are ready!");
      servicesReady = true;
      break;
    }

    console.log("Services not ready, waiting 5 seconds to retry...");
    await new Promise((resolve) => setTimeout(resolve, 5000));
  }
};

const areServicesReady = () => servicesReady;

module.exports = { waitForServices, areServicesReady };
