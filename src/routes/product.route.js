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
router.get("/fetchAllproduct", fetchAllProduct);
router.get("/fetchsingleproduct", fetchSingleProduct);
router.get("/fetchProductByCategory", fetchProductByCategory);
router.get("/fetchProductByname", fetchProductByname);
router.patch("/updateProduct", updateProduct);
router.delete("/deleteProduct", deleteProduct);

module.exports = router;
