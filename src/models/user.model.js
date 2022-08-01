const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please enter your first Name!"],
      lowercase: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "Please enter your last Name!"],
      lowercase: true,
      trim: true,
    },
    phoneNumber: {
      type: Number,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    password: {
      type: String,
      required: [true, "Please enter a password!"],
    },
    role: {
      type: String,
      enum: ["BasicUser", "MidUser", "AdvanceUser"],

    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    age: {
      type: Number,
      require: true
    },
    passwordChangedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);
const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
