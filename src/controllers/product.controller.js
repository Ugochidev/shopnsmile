const Product = require("../models/product.model");

const addProduct = async (req, res, next) => {
  try {
    const {
      categories,
      productName,
      brandName,
      manufacturingDate,
      expiryDate,
      quantityAvailable,
      pricePerItem,
    } = req.body;
    const newProduct = new Product({
      productId: uuid.v4(),
      categories,
      productName,
      brandName,
      manufacturingDate,
      expiryDate,
      quantityAvailable,
      pricePerItem,
      dateCreated: newProduct.createdAt,
    });
    await newProduct.save;
    return res.status(201).json({ message: "Product added successfully." });
  } catch (error) {
    return res.status(500).json({
      messsage: error.message,
    });
  }
};

const fetchAllProduct = async (req, res, next) => {
  try {
  } catch (error) {}
};
module.exports = {
  addProduct,
  fetchAllProduct,
  fetchSingleProduct,
  fetchProductByCategory,
  fetchProductByname,
  updateProduct,
  deleteProduct,
};
