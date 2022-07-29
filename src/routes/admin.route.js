//  require dependencies
const express = require("express");
const router = express.Router();
const { authenticate, authorize } = require("../middleware/auth.middleware");
const {
  createAdmin,
  verifyEmail,
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
router.post("/auth/verifyemail", verifyEmail);
router.post("/auth/loginadmin", loginAdmin);
router.get("/auth/getallusers", getAllUsers);
router.get("/auth/countusers", countUsers);
router.get("/auth/resetpassword", resetPassword);
router.get("/auth/getsingleuser", getSingleUser);
router.get("/auth/forgetpasswordlink", forgetPasswordLink);
router.get("/auth/changeassword", changePassword);

//    exporting modules
module.exports = router;
