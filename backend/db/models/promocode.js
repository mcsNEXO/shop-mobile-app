const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const promoCodeSchema = new Schema({
  promocode: {
    type: String,
  },
  precent: {
    type: Number,
  },
});

const PromoCode = mongoose.model("promocode", promoCodeSchema);

module.exports = PromoCode;
