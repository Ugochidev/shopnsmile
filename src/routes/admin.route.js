//  require dependencies
const express = require("express");
const router = express.Router();
const { authenticate, authorize } = require("../middleware/auth.middleware");
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
router.get("/auth/verifyemailadmin", verifyEmailAdmin);
router.post("/auth/resendverificationmailadmin", resendVerificationMailAdmin);
router.post("/auth/loginadmin", loginAdmin);
router.get("/auth/getallusers", authenticate, authorize, getAllUsers);
router.get("/auth/countusers", authenticate, authorize, countUsers);
router.get("/auth/resetpassword", authenticate, resetPassword);
router.get("/auth/getsingleuser", authenticate, authorize, getSingleUser);
router.get("/auth/forgetpasswordlink", forgetPasswordLink);
router.get("/auth/changeassword", authenticate, changePassword);

//    exporting modules
module.exports = router;
