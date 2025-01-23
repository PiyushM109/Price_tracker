const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DBLINK);
    console.log("Database connected successfully!");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
