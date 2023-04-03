const express = require("express");
const roles = require("../roles");
const router = express.Router();
const { authenticate, authorize } = require("../middleware/auth.middleware");
const {
  createUser,
  verifyEmail,
  resendVerificationMail,
  login,
  resetPassword,
  forgetPasswordLink,
  changePassword,
} = require("../controllers/auth.controller");


//  creating a route

router.post(
  "/user",
  authenticate,
  authorize(roles.superAdmin),
 createUser
);
router.get("/verifyemail", verifyEmail);
router.post("/resendverificationmail", resendVerificationMail);
router.post("/loginuser", login);
router.post("/forgetpasswordlink/", forgetPasswordLink);
router.patch("/changeassword/", changePassword);
router.patch("/resetpassword", authenticate, resetPassword);

module.exports = router