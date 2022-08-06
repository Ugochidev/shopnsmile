const express = require("express");
const router = express.Router();
const {
  addProduct,
  fetchAllProduct,
  fetchSingleProduct,
  fetchProductByCategory,
  fetchProductByname,
  updateProduct,
  deleteProduct,
} = require("../controllers/product.controller");

router.post("/addproduct", addProduct);

module.exports = router;
