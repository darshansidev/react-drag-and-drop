require("dotenv").config();
const mongoose = require("mongoose");

const connectdb = async () => {
  try {
    const DATABASE_URL = process.env.MONGO_URL;
    await mongoose
      .connect(DATABASE_URL)
      .then(() => {
        console.log("connected");
      })
      .catch((e) => {
        console.log(e);
      });
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectdb;
