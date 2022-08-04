// require dependencies
const jwt = require("jsonwebtoken");
const roles = require("../roles");
const User = require("../models/user.model");
require("dotenv").config();

//  authenticating  user
const authenticate = async (req, res, next) => {
  try {
    let authorization = req.headers.authorization;
    if (!authorization) {
      return res.status(401).json({
        message: "Token is required",
      });
    }
    const authenticationArr = authorization.split(" ");
    if (authenticationArr[0] !== "Bearer") {
      return res.status(401).json({
        message: "Bearer is required",
      });
    }
    let token = authenticationArr[1];
    if (!token) {
      return res.status(401).json({
        message: "Token is required",
      });
    }
    const decryptToken = await jwt.verify(token, process.env.SECRET_TOKEN);
    const validUser = await User.findOne({ _id: decryptToken._id });
    if (!validUser) {
      return res.status(401).json({
        message: "Invalid token...",
      });
    }
    req.user = decryptToken;
    next();
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const authorize = function (action, resource) {console.log("lplpl");
  return async (req, res, next) => {console.log("lplpl");
    try {
      const permission = roles.can(req.user.role)[action](resource);
      if (!permission.granted) {
        return res.status(401).json({
          error: "You don't have enough permission to perform this action",
        });
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};
//    exporting modules
module.exports = { authenticate, authorize };
