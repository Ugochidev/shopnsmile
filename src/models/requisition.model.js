const mongoose = require("mongoose")
const Schema = mongoose.Schema

const requisitionSchema = new Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
 userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  collectedBy: {
    type: String,
    required: true,
  },
  date: {
    type: Date.now,
    required: true,
  },
  quantityCollected: {
    type: Number,
    required: true,
  },
});

const Requisition = mongoose.model("Requisition", requisitionSchema);

module.exports = Requisition;