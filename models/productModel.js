const mongoose = require("mongoose");
const objectId = mongoose.Types.ObjectId;

const productSchema = new mongoose.Schema(
  {
    image: {
      type: [String],
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    quantity: {
      type: String,
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
    },
    branchId: {
      type: objectId,
      ref: "Branch",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
