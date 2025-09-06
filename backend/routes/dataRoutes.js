const Router = require("express");
const {
  scrapeData,
  getAllProducts,
  getProductById,
  getUserProducts,
  addEmail,
} = require("../controllers/dataController.js");
const verifyToken = require("../middlewares/Jwt_middlewares.js");

const dataRouter = Router();

dataRouter.get("/scrape", verifyToken, scrapeData);

dataRouter.get("/allProduct", getAllProducts);

dataRouter.get("/product/:id", verifyToken, getProductById);

dataRouter.get("/user/products", verifyToken, getUserProducts);

dataRouter.post("/product/addEmail", verifyToken, addEmail);

module.exports = dataRouter;
