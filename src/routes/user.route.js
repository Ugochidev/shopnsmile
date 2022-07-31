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
router.post("/auth/verifyemail/user", verifyEmail);
router.post("/auth/resendverificationmail/user", resendVerificationMail);
router.post("/auth/login/user", loginUser);
router.post("/auth/forgetpasswordlink/user", forgetPasswordLink);
router.patch("/auth/forgetpassword/user", changePassword);
router.patch("/auth/resetpassword/user", resetPassword);

module.exports = router;
