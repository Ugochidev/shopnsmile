// require dependencies
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
//  creating connection to database
const { DATABASE_URL } = process.env;

const connectDB =() => {
  try {
   mongoose.connect(DATABASE_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("Database is connected");
  } catch (error) {
    console.log("Database connection failed");
  }
};
//   exporting modules
module.exports = connectDB;
