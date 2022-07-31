//  require dependencies
const express = require("express");
const router = express.Router();
// const { authenticate, authorize } = require("../middleware/auth.middleware");
const {
  createAdmin,
  verifyEmailAdmin,
  resendVerificationMailAdmin,
  loginAdmin,
  getAllUsers,
  countUsers,
  resetPassword,
  getSingleUser,
  forgetPasswordLink,
  changePassword,
} = require("../controllers/admin.controller");
//  creating a route
router.post("/auth/admin", createAdmin);
router.get("/auth/verifyemail/admin", verifyEmailAdmin);
router.post("/auth/resendverificationmail/admin", resendVerificationMailAdmin);
router.post("/auth/login/admin", loginAdmin);
router.get("/auth/getallusers", getAllUsers);
router.get("/auth/countusers", countUsers);
router.patch("/auth/resetpassword/admin", resetPassword);
router.get("/auth/getsingleuser", getSingleUser);
router.post("/auth/forgetpasswordlink/admin", forgetPasswordLink);
router.patch("/auth/changeassword/admin", changePassword);

//    exporting modules
module.exports = router;
