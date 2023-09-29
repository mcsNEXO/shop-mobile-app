const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  orderedAt: {
    type: String,
    default: Date.now(),
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  uniqueCode: {
    type: String,
    unique: true,
    required: true,
  },
  status: {
    type: String,
    default: "ordered",
    required: true,
  },
  orderData: {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    locality: {
      type: String,
      required: true,
    },
    postalCode: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
    },
  },

  products: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      color: {
        type: String,
        required: true,
      },
      size: {
        type: Number || null,
        required: false,
      },
    },
  ],
});

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;
