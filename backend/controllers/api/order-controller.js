const Order = require("../../db/models/order");
const Cart = require("../../db/models/cart");

class OrderController {
  async makeOrder(req, res) {
    console.log(req.body);
    try {
      await Order.create(req.body);
      await Cart.findOneAndDelete({ user: req.body.user });
      return res.status(200).json("Ordered");
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = new OrderController();
