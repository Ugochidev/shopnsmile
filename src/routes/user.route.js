//  require dependencies
const express = require("express");
const router = express.Router();
const { authenticate, authorize } = require("../middleware/auth.middleware");
const {
  createUser,
  verifyEmail,
  resendVerificationMail,
  login,
  getAllUsers,
  countUsers,
  resetPassword,
  getSingleUser,
  forgetPasswordLink,
  changePassword,
} = require("../controllers/user.controller");
//  creating a route
router.post("/auth/user", createUser);
router.get("/auth/verifyemail", verifyEmail);
router.post("/auth/resendverificationmail", resendVerificationMail);
router.post("/auth/login", login);
// router.get("/auth/getallusers", authenticate([]), getAllUsers);
router.get("/auth/countusers", countUsers);
router.patch("/auth/resetpassword", authenticate, resetPassword);
router.get("/auth/getsingleuser", getSingleUser);
router.post("/auth/forgetpasswordlink/", forgetPasswordLink);
router.patch("/auth/changeassword/", changePassword);

//    exporting modules
module.exports = router;
