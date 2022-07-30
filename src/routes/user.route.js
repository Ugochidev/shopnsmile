//  require dependencies
const express = require("express");
const router = express.Router();
// const { authenticate } = require("../middleware/auth.middleware");
const {
  createUser,
  verifyEmail,
  resendVerificationMail,
  loginUser,
  forgetPasswordLink,
  changePassword,
  resetPassword,
} = require("../controllers/user.controller");

router.post("/auth/user", createUser);
router.post("/auth/verifyemailuser", verifyEmail);
router.post("/auth/resendverificationmailuser", resendVerificationMail);
router.post("/auth/loginuser", loginUser);
router.post("/auth/forgetpasswordlink", forgetPasswordLink);
router.post("/auth/forgetpassword", changePassword);
router.post("/auth/resetpassword", resetPassword);

module.exports = router;
