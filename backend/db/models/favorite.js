const mongoose = require("mongoose");

const favoriteSchema = new mongoose.Schema({
  user: String,
  products: Array,
});

const Favorite = mongoose.model("Favorite", favoriteSchema);

module.exports = Favorite;
