const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sizeSchema = new Schema({
  size: {
    type: String,
    required: [true, "Select size!"],
  },
  quantity: {
    type: Number,
    required: [true, "Write quantity!"],
    default: 0,
  },
});

const colorsSchema = new Schema({
  color: {
    type: String,
    required: [true, "Select color!"],
  },
  sizes: [sizeSchema],
  image: {
    type: String,
    required: true,
  },
});

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: false,
    minlength: [3, "Min 3 characters!"],
    lowercase: true,
    trim: true,
  },
  gender: {
    type: String,
    required: [true, "Select gender!"],
    lowercase: true,
  },
  type: {
    type: String,
    required: [true, "Select type!"],
    lowercase: true,
  },
  category: {
    type: String,
    required: [true, "Select gender!"],
    lowercase: true,
  },
  price: {
    type: Number,
    required: [true, "Write price!"],
  },
  colors: [colorsSchema],
  description: {
    type: String,
    trim: true,
    required: [true, "Write description!"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
