const express = require("express");
const router = express.Router();
const roles = require("../roles");
const { authenticate, authorize } = require("../middleware/auth.middleware");
const {
  addProduct,
  fetchAllProduct,
  fetchSingleProduct,
  fetchProductByCategory,
  fetchProductByname,
  updateProduct,
  deleteProduct,
} = require("../controllers/product.controller");


//  creating a route
router.post(
  "/addproduct",
  authenticate,
  authorize([roles.superAdmin, roles.admin, roles.supervisor]),
  addProduct
);
router.get("/fetchAllproduct", authenticate, fetchAllProduct);
router.get("/fetchsingleproduct", authenticate, fetchSingleProduct);
router.get("/fetchProductByCategory", authenticate, fetchProductByCategory);
router.get("/fetchProductByname", authenticate, fetchProductByname);
router.patch(
  "/updateProduct",
  authenticate,
  authorize([roles.superAdmin, roles.admin, roles.supervisor]),
  updateProduct
);
router.delete(
  "/deleteProduct",
  authenticate,
  authorize([roles.superAdmin, roles.admin]),
  deleteProduct
);

module.exports = router;
