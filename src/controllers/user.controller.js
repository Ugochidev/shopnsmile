const User = require("../models/user.model");
// const { successResMsg, errorResMsg } = require("../utils/response");
// const AppError = require("../utils/appError");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const bcrypt = require("bcrypt");
const { sendMail } = require("../DBconnect/sendMail");
const {
  validateRegister,
  validateEmail,
  validateLogin,
  validatePassword,
  validateNewPassword,
} = require("../middleware/validiate.middleware");
const { json } = require("express");

//  creating  a user
const createUser = async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      phoneNumber,
      email,
      password,
      confirmPassword,
    } = req.body;
    await validateRegister.validateAsync(req.body);

    // validating phoneNumber
    const phoneNumberExist = await User.findOne({ phoneNumber });
    if (phoneNumberExist) {
      return res.status(400).json({
        message: "PhoneNumber already exist please login",
      });
    }
    // validating email
    const emailExist = await User.findOne({ email });
    if (emailExist) {
      return res.status(400).json({
        message: "email exists, please login",
      });
    }
    if (confirmPassword !== password) {
      return res.status(401).json({
        message: "Passwords do not match.",
      });
    }
    //  hashing password
    const hashPassword = await bcrypt.hash(password, 10);
    // creating a new user
    const newUser = await User.create({
      firstName,
      lastName,
      phoneNumber,
      email,
      password: hashPassword,
    });
    const url = "shopNsmile.com";
    let mailOptions = {
      to: newUser.email,
      subject: "Verify Email",
      text: `Hi ${newUser.firstName.toUpperCase()}, Pls verify your email. ${url}`,
    };
    sendMail(mailOptions);
    return res.status(201).json({
      message: "User created",
      //   newUser,
      _id: newUser._id,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// verifying Email

const verifyEmail = async (req, res, next) => {
  try {
    const { email } = req.query;
    const user = await User.findOne({ email }).select("isVerified");
    if (user.isVerified) {
      return res.status(200).json({
        message: "User verified already",
      });
    }
    user.isVerified = true;
    user.save();
    return res.status(200).json({
      message: "User verified successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const resendVerificationMail = async (req, res, next) => {
  try {
    const { email } = req.body;
    await validateEmail.validateAsync(req.body);
    const emailExists = await User.findOne({ email });
    if (!emailExists) {
      return res.status(400).json({
        message: "This email does not exist, please sign up.",
      });
    }
    if (emailExists.isVerified) {
      return res.status(400).json({
        message: "This email has already been verified.",
      });
    }
    const url = "shopNsmile.com";
    let mailOptions = {
      to: emailExists.email,
      subject: "Verify Email",
      text: `Hi ${emailExists.firstName.toUpperCase()}, Pls verify your email. ${url}`,
    };
    sendMail(mailOptions);
    return res.status(200).json({
      message: `Hi ${emailExists.firstName.toUpperCase()}, Please check your email for verification.`,
    });
  } catch (error) {
    return res.status(500).json({
      message: `${error.message}, Try again later.`,
    });
  }
};
// logging in a user
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    await validateLogin.validateAsync(req.body);
    const emailExist = await User.findOne({ email });
    if (!emailExist) {
      return res.status(400).json({
        message: "email does not exist please sign-up",
      });
    }
    let isemailExist = await bcrypt.compare(password, emailExist.password);
    if (!isemailExist) {
      return res.status(400).json({
        message: "Invalid credientials",
      });
    }
    if (!emailExist.isVerified) {
      return res.status(401).json({ message: "Admin not verified" });
    }
    const data = {
      _id: emailExist._id,
    };

    const token = await jwt.sign(data, process.env.SECRET_TOKEN, {
      expiresIn: "24h",
    });
    return res
      .status(200)
      .json({
        message: "User logged in sucessfully",
        _id: emailExist._id,
        token,
      });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const forgetPasswordLink = async (req, res, next) => {
  try {
    const { email } = req.body;
    const emailExist = await User.findOne({ email });
    if (!emailExist) {
      return res.status(400).json({ message: "Email does not exist" });
    }
    const data = {
      id: emailExist._id,
    };
    // getting a secret token
    const secret_key = process.env.SECRET_TOKEN;
    const token = await jwt.sign(data, secret_key, { expiresIn: "24hr" });
    let mailOptions = {
      to: emailExist.email,
      subject: "Reset Password",
      text: `Hi ${emailExist.firstName.toUpperCase()}, Reset your password with the link below.${token}`,
    };
    sendMail(mailOptions);
    return res.status(200).json({
      message: `Hi ${emailExist.firstName.toUpperCase()},reset password.`,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const changePassword = async (req, res, next) => {
  try {
    const { newPassword, confirmPassword } = req.body;
    await validatePassword.validateAsync(req.body);
    const { email} = req.query;
    if (newPassword !== confirmPassword) {
      return res.status(401).json({ message: "Password do not match." });
    }
    const hashPassword = await bcrypt.hash(confirmPassword, 10);
    await User.updateOne(
      { email },
      { password: hashPassword },
      {
        new: true,
      }
    );
    return res.status(200).json({
      message: `Password has been updated successfully.`,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const resetPassword = async (req, res, next) => {
  try {
    const { oldPassword, newPassword, confirmPassword } = req.body;
    await validateNewPassword.validateAsync(req.body);
    const { _id } = req.query;
    const loggedUser = await User.findOne({ _id });
    const headerTokenId = await jwt.verify(
      req.headers.authorization.split(" ")[1],
      process.env.SECRET_TOKEN
    )._id;
    console.log(loggedUser);
    // if (headerTokenId !== loggedUser._id) {
    //   return res.status(404).json({ message: "Forbidden" });
    // }
    const passwordMatch = await bcrypt.compare(
      oldPassword,
      loggedUser.password
    );
    if (!passwordMatch) {
      return res.status(404).json({ message: "Invalid" });
    }
    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: "Password do not match." });
    }
    const hashPassword = await bcrypt.hash(confirmPassword, 10);
    await User.updateOne({ _id }, { password: hashPassword });
    return res.status(200).json({
      message: `Password has been updated successfully.`,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

//   exporting modules
module.exports = {
  createUser,
  verifyEmail,
  loginUser,
  forgetPasswordLink,
  changePassword,
  resetPassword,
  resendVerificationMail,
};
