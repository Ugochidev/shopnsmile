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
    const allProducts = await Product.find();
    if (!allProducts) {
      return res.status(404).json({ message: "NO product found" });
    }
    return res
      .status(200)
      .json({ message: "fetched successfully ....", allProducts });
  } catch (error) {
    return res.status(500).json({
      messsage: error.message,
    });
  }
};
const fetchSingleProduct = async (req, res, next) => {
  try {
    const { productId } = req.query;
    const product = await Product.findOne({ productId });
    if (!product) {
      return res.status(404).json({ message: "NO product found" });
    }
    return res
      .status(200)
      .json({ message: "Product fetched successfully ....", allProducts });
  } catch (error) {
    return res.status(500).json({
      messsage: error.message,
    });
  }
};
const fetchProductByCategory = async (req, res, next) => {
  try {
    const { categories } = req.query;
    const category = await Product.findOne({ categories });
    if (!category) {
      return res.status(404).json({ message: "NO product found" });
    }
    return res
      .status(200)
      .json({ message: "Goods fetched successfully ....", category });
  } catch (error) {
    return res.status(500).json({
      messsage: error.message,
    });
  }
};

const fetchProductByname = async (req, res, next) => {
  try {
    const { productName } = req.body;
    const product = await Product.find();
    if (!product) {
      return res.status(400).json({
        message: "Bad request.",
      });
    }
    const searchResult = [];
    product.forEach((result) => {
      console.log(result.productName);
      console.log(
        result.productName.toString().includes(productName.toString())
      );
      if (
        result.productName.toLowerCase().includes(productName.toLowerCase())
      ) {
        console.log(productName);
        searchResult.push(result);
      }
    });
    console.log(searchResult);
    return res.status(200).json({
      message: "Products fetched successsfully...",
      searchResult,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const { productId } = req.query;
    const update = await Product.findOneAndUpdate({ productId }, req.body, {
      new: true,
    });
    if (!update) {
      return res.status(404).json({ message: "Product not found ..." });
    }

    return res.status(200).json({ message: "Updated successfully", update });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const { productId } = req.query;
    const removeProduct = await Product.findOneAndUpdate({ productId });
    if (!removeProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.status(200).json({ message: "Product successfully deleted..." });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
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
