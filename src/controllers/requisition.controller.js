const Requisition = require("../models/requisition.model");
const uuid = require("uuid");

const createRequisition = async (req, res, next) => {
  try {
    const { productId, userId } = req.query;
    const id = req.user._id
    console.log(id);
    const {collectedBy, dateCreated, quantityCollected } =
      req.body;
    const newRequisition = new Requisition({
      requisitionId: uuid.v4(),
      productId,
      userId: id,
      collectedBy,
      dateCreated,
      quantityCollected,
    });
    await newRequisition.save();
    return res
      .status(201)
      .json({ message: "Requisition created successfully.", newRequisition });
  } catch (error) {
    return res.status(500).json({
      messsage: error.message,
    });
  }
};

const fetchRequisition = async (req, res, next) => {
  try {
    const { requisitionId } = req.query;
    const requisition = await Requisition.findOne({ requisitionId }).populate(
      "userId productId"
    );
    if (!requisition) {
      return res.status(404).json({
        message: "Requisition not found",
      });
    }
    return res.status(200).json({
      message: "Requisition fetched successfully ....",
      requisition,
    });
  } catch (error) {
    return res.status(500).json({
      messsage: error.message,
    });
  }
};

const fetchAllRequisition = async (req, res, next) => {
  try {
    const allRequisition = await Requisition.find().populate(
      "userId productId"
    );
    if (!allRequisition) {
      return res.status(404).json({ message: "NO requisition found" });
    }
    return res
      .status(200)
      .json({ message: "fetched successfully ....", allRequisition });
  } catch (error) {
    return res.status(500).json({
      messsage: error.message,
    });
  }
};

const updateRequisition = async (req, res, next) => {
  try {
    const { requisitionId } = req.query;
    const update = await Requisition.findOneAndUpdate(
      { requisitionId },
      req.body,
      { new: true }
    );
    if (!update) {
      return res.status(404).json({ message: "Requisition not found" });
    }
    return res
      .status(200)
      .json({ message: "Requisition updated successfully ....", update });
  } catch (error) {
    return res.status(500).json({
      messsage: error.message,
    });
  }
};

const deleteRequisition = async (req, res, next) => {
  try {
    const { requisitionId } = req.query;
    const removeRequisition = await Requisition.findOneAndDelete({
      requisitionId,
    });
    if (!removeRequisition) {
      return res.status(404).json({ message: "Requisition not found" });
    }
    return res
      .status(200)
      .json({ message: "Requisition deleted successfully ...." });
  } catch (error) {
    return res.status(500).json({
      messsage: error.message,
    });
  }
};
module.exports = {
  createRequisition,
  fetchRequisition,
  fetchAllRequisition,
  updateRequisition,
  deleteRequisition,
};
