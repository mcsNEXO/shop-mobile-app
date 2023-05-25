const PromoCode = require("../../db/models/promocode");
class PromoCodeController {
  async getCode(req, res) {
    const code = await PromoCode.find({ promocode: req.body.code });
    code.length > 0
      ? res
          .status(200)
          .json({ promocode: req.body.code, precent: code[0].precent })
      : res
          .status(400)
          .json({ message: "This promo code does not exist", precent: 0 });
  }
}

module.exports = new PromoCodeController();
