const express = require("express");
const router = express.Router();
const { authenticate, authorize } = require("../middleware/auth.middleware");
const {
  createRequisition,
  fetchRequisition,
  fetchAllRequisition,
  updateRequisition,
  deleteRequisition,
} = require("../controllers/requisition.controller");

router.post("/createRequisition", authenticate, createRequisition);
router.get("/fetchrequisition", fetchRequisition);
router.get("/fetchAllRequisition", fetchAllRequisition);
router.patch("/updateRequisition", updateRequisition);
router.delete("/deleteRequisition", deleteRequisition);

module.exports = router;
