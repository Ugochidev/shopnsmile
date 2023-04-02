//  require dependencies
const express = require("express");
const roles = require("../roles");
const router = express.Router();
const { authenticate, authorize } = require("../middleware/auth.middleware");
const {
  getAllUsers,
  countUsers,
  getSingleUser,
} = require("../controllers/user.controller");


//  creating a route
router.get("/auth/getallusers", authenticate, authorize([roles.superAdmin, roles.admin]), getAllUsers);
router.get(
  "/auth/countusers",
  authenticate,
  authorize([roles.superAdmin, roles.admin, roles.supervisor]),
  countUsers
);
router.get(
  "/auth/getsingleuser",
  authenticate,
  authorize([roles.superAdmin, roles.admin]),
  getSingleUser
);

//    exporting modules
module.exports = router;
