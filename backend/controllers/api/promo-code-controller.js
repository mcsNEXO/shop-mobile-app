const PromoCode = require("../../db/models/promocode");
class PromoCodeController {
  async getCode(req, res) {
    const promocode = req.body.code;
    const codes = await PromoCode.find();
    codes.filter((item) => {
      item.promocode === promocode
        ? res
            .status(200)
            .json({ promocode: item.promocode, precent: item.precent })
        : res
            .status(200)
            .json({ message: "This promo code does not exist", precent: 0 });
    });
  }
}

module.exports = new PromoCodeController();
