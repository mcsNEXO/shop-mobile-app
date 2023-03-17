const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const shoesSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: false,
    minlength: [3, "Min 3 characters!"],
    lowercase: true,
    trim: true,
  },
  type: {
    type: String,
    required: true,
    lowercase: true,
  },
  category: {
    type: String,
    trim: true,
    required: true,
    lowercase: true,
  },
  colors: {
    type: Array,
    required: [true, "Select min 1 color!"],
  },
  size: {
    type: Array,
    required: [true, "Select min 1 size!"],
  },
  image: [
    {
      type: String,
      required: true,
      lowercase: true,
    },
  ],
  price: {
    type: Number,
    required: [true, "Write price!"],
  },
  gender: {
    type: String,
    required: [true, "Select gender!"],
    lowercase: true,
  },
  index: {
    type: Number,
    default: 0,
  },
});

const Shoes = mongoose.model("Shoes", shoesSchema);

module.exports = Shoes;
