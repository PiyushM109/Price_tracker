const express = require("express");
const cron = require("node-cron");
const mongoose = require("mongoose");
const updateProducts = require("./update_products");
require("./models/User");
require("dotenv").config();

const app = express();

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_LINK, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");

    cron.schedule(
      "0 0 * * *",
      () => {
        console.log("Running product update...");
        updateProducts();
      },
      {
        timezone: "Asia/Kolkata",
      }
    );

    app.listen(3001, () => {
      console.log("Server is running on port 3001");
    });
  } catch (error) {
    console.error("Failed to start server:", error);
  }
};

startServer();
