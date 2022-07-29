//  Require dependencies

const Admin = require("../models/admin.model");
const User = require("../models/user.model");
// const { successResMsg, errorResMsg } = require("../utils/response");
// // const AppError = require("../utils/appError");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const bcrypt = require("bcrypt");
const { sendMail } = require("../DBconnect/sendMail");
const {
  validateRegister,
  validateLogin,
} = require("../middleware/validiate.middleware");

//  creating  Admin
const createAdmin = async (req, res, next) => {
  try {
    const { firstName, lastName, phoneNumber, email, password } = req.body;
    const result = await validateRegister.validateAsync(req.body);

    // validating phoneNumber
    const phoneNumberExist = await Admin.findOne({ phoneNumber });
    if (phoneNumberExist) {
      return res.status(400).json({
        message: "PhoneNumber already exist please login",
      });
    }
    // validating email
    const emailExist = await Admin.findOne({ email });
    if (emailExist) {
      return res.status(400).json({
        message: "email exists, please login",
      });
    }
    // hashing password
    const hashPassword = await bcrypt.hash(password, 10);

    // create  a new Admin
    const newAdmin = await Admin.create({
      firstName,
      lastName,
      phoneNumber,
      email,
      password: hashPassword,
    });
    const url = "shopNsmile.com";
    let mailOptions = {
      to: newAdmin.email,
      subject: "Verify Email",
      text: `Hi ${firstName}, Pls verify your email. ${url}`,
    };
    sendMail(mailOptions);
    return res.status(201).json({
      message: "Admin  created",
      //   newAdmin,
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
    const { token } = req.query;
    const decodedToken = await jwt.verify(token, process.env.SECRET_TOKEN);
    const admin = await Admin.findOne({ email: decodedToken.email }).select(
      "isVerfied"
    );
    if (admin.isVerified) {
      return res.status(200).json({
        message: "Admin verified already",
      });
    }
    admin.isVerified = true;
    admin.save();
    return res.status(201).json({
      message: "Admin verified successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
//  login for Admin
const loginAdmin = async (req, res, next) => {
  try {
    const { phoneNumber, password } = req.body;
    await validateLogin.validateAsync(req.body);

    const phoneNumberExist = await Admin.findOne({ phoneNumber });
    if (!phoneNumberExist) {
      return res.status(400).json({
        message: "PhoneNumber does not exist please sign-up",
      });
    }
    let isPasswordExist = await bcrypt.compare(
      password,
      phoneNumberExist.password
    );
    if (!isPasswordExist) {
      return res.status(400).json({
        message: "Invalid credientials",
      });
    }
    if (phoneNumberExist.role == "User") {
      return res.status(401).json({ message: "Unauthorized" });
    }
    if (!emailExist.isVerified) {
      return res.status(401).json({ message: "Admin not verified" });
    }
    const data = {
      id: phoneNumberExist._id,
    };

    const token = await jwt.sign(data, process.env.SECRET_TOKEN, {
      expiresIn: "24h",
    });
    return res
      .status(200)
      .json({ message: "Admin logged in sucessfully", token });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const forgetPasswordLink = async (req, res, next) => {
  try {
    const { email } = req.body;
    const EmailExist = await Admin.findOne({ email });
    if (!EmailExist) {
      return res.status(400).json({ message: "Email does not exist" });
    }
    const data = {
      id: EmailExist._id,
    };
    // getting a secret token
    const secret_key = process.env.SECRET_TOKEN;
    const token = await jwt.sign(data, secret_key, { expiresIn: "24hr" });
    let mailOptions = {
      to: EmailExist.email,
      subject: "Reset Password",
      text: `Hi ${EmailExist.firstName}, Reset your password with the link below.${token}`,
    };
    sendMail(mailOptions);
    return res.status(200).json({
      message: `Hi ${EmailExist.firstName},reset password.`,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const changePassword = async (req, res, next) => {
  try {
    const { newPassword, confirmPassword } = req.body;
    const { email, token } = req.query;
    const secret_key = process.env.SECRET_TOKEN;
    const decoded_token = await jwt.verify(token, secret_key);
    if (decoded_token.email !== email) {
      return res.status(404).json({ message: "Email do not match." });
    }
    if (newPassword !== confirmPassword) {
      return res.status(401).json({ message: "Password do not match." });
    }
    const hashPassword = await bcrypt.hash(confirmPassword, 10);
    await Admin.updateOne(
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
    const { email } = req.query;
    const loggedUser = await Admin.findOne({ email });
    const headerTokenEmail = await jwt.verify(
      req.headers.authorization.split(" ")[1],
      process.env.SECRET_TOKEN
    ).email;
    if (headerTokenEmail !== loggedUser.email) {
      return res.status(404).json({ message: "Forbidden" });
    }
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
    await User.updateOne({ email }, { password: hashPassword });
    return res.status(200).json({
      message: `Password has been updated successfully.`,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
//  getting all Users
const getAllUsers = async (req, res, next) => {
  try {
    const getUsers = await User.find();
    return res.status(200).json({
      message: "Get Users sucessfully",
      getUsers,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getSingleUser = async (req, res, next) => {
  try {
    const { _id } = req.query;
    const singleUser = await User.find({ _id });
    return res.status(200).json({
      message: "Get Users sucessfully",
      singleUser,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//  counting all registered user
const countUsers = async (req, res, next) => {
  try {
    const usercount = await User.countDocuments();
    return res.status(200).json({ message: "Users counted", usercount });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createAdmin,
  verifyEmail,
  loginAdmin,
  resetPassword,
  getSingleUser,
  getAllUsers,
  countUsers,
  forgetPasswordLink,
  changePassword,
};
