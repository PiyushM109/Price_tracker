const Router = require("express");
const {
  scrapeData,
  getAllProducts,
  getProductById,
  getUserProducts,
  addEmail,
} = require("../controllers/dataController.js");


const dataRouter = Router();

dataRouter.get("/scrape", scrapeData);

dataRouter.get("/allProduct", getAllProducts);

dataRouter.get("/product/:id", getProductById);

dataRouter.get("/user/products", getUserProducts);

dataRouter.post("/product/addEmail", addEmail);

module.exports = dataRouter;
