const express = require("express");
const router = express.Router();
const roles = require("../roles");
const { authenticate, authorize } = require("../middleware/auth.middleware");
const {
  createRequisition,
  fetchRequisition,
  fetchAllRequisition,
  updateRequisition,
  deleteRequisition,
} = require("../controllers/requisition.controller");

//  creating a route
router.post(
  "/createRequisition",
  authenticate,
  authorize([roles.superAdmin, roles.admin, roles.supervisor]),
  createRequisition
);
router.get(
  "/fetchrequisition",
  authenticate,
  authorize([roles.superAdmin, roles.admin, roles.supervisor]),
  fetchRequisition
);
router.get(
  "/fetchAllRequisition",
  authenticate,
  authorize([roles.superAdmin, roles.admin, roles.supervisor]),
  fetchAllRequisition
);
router.patch(
  "/updateRequisition",
  authenticate,
  authorize([roles.superAdmin, roles.admin, roles.supervisor]),
  updateRequisition
);
router.delete(
  "/deleteRequisition",
  authenticate,
  authorize([roles.superAdmin, roles.admin]),
  deleteRequisition
);
module.exports = router;
