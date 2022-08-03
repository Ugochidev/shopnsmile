const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    categories: {
    eletronics: {
      productId: {
        type: String,
      },
      productName: {
        type: String,
      },
      brandName: {
        type: String,
      },
      expiryDate: {
        type: Date,
      },
      quantityAvailable: {
        type: Number,
        required: true,
      },
      pricePerItem,
    },
    dateCreated: {
      type: Date,
    },
    drinks: {
      productId: {
        type: String,
      },
      drinkName: {
        type: String,
      },
      brandName: {
        type: String,
      },
      manufacturingDate: {
        type: Date,
      },
      expiryDate: {
        type: Date,
      },
      quantityAvailable: {
        type: Number,
        required: true,
      },
      dateCreated: {
        type: Date,
      },
    },
    fashion: {
      productId: {
        type: String,
      },
      productName: {
        type: String,
      },
      brandName: {
        type: String,
      },
      expiryDate: {
        type: Date,
      },
      quantityAvailable: {
        type: Number,
        required: true,
      },
      pricePerItem,
    },
    dateCreated: {
      type: Date,
    },
    foodItem: {
      productId: {
        type: String,
      },
      productName: {
        type: String,
      },
      brandName: {
        type: String,
      },
      expiryDate: {
        type: Date,
      },
      quantityAvailable: {
        type: Number,
        required: true,
      },
      pricePerItem,
    },
    dateCreated: {
      type: Date,
    },
  },
},
  {
    timestamps: true,
  }
);

const Product = mongoose.model("product", productSchema);
module.exports = Product