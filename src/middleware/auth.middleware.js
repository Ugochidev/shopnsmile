// require dependencies
const jwt = require("jsonwebtoken");
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
     const decryptToken = await jwt.verify(token, process.env.SECRET_TOKEN, {
       expiresIn: "1d",
     });
  
    req.user = decryptToken;
    next();
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const authorize = (roleIds = []) => {
  if (typeof roleIds === "string") {
    roleIds = [roleIds];
  }

  return [
    // authorize based on user role
    (req, res, next) => {
      if (roleIds.length && !roleIds.includes(req.user.role)) {
        return res.status(401).json({message:
          `${req.user.role.toUpperCase()} does not have permission to perform this action or access this route`
      });
      }

      // authentication and authorization successful
      next();
      return false;
    },
  ];
};

//    exporting modules
module.exports = { authenticate, authorize };
