const Cart = require("../../db/models/cart");
const Favorite = require("../../db/models/favorite");

class CartController {
  async addProdcut(req, res) {
    let type = req.body.type;
    //this is a variable that tells which function will be called
    let userData = "";
    if (type === "cart") {
      userData = await Cart.findOne({ user: req.body.userId });
    } else if (type === "favorite") {
      userData = await Favorite.findOne({ user: req.body.userId });
    } else {
      return res.status(400).json({ message: "Wrong type" });
    }

    const products = req.body.product ? [req.body.product] : req.body.cart;

    for (let i = 0; i < products?.length; i++) {
      let product = products[i];
      if (userData?.user && userData.user !== null) {
        const exist = userData.products?.find(
          (x) =>
            x._id === product._id &&
            x.colors === product.colors &&
            x.size === product.size
        );
        if (exist) {
          const newCart = userData?.products.map((x) =>
            x._id === product._id && x.size === product.size
              ? {
                  ...x,
                  quantity:
                    product.quantity > 1
                      ? x.quantity + product.quantity
                      : x.quantity + 1,
                }
              : x
          );
          newCart.filter((x) =>
            x.quantity > 10 ? (x.quantity = 10) : x.quantity
          );
          userData.products = newCart;
          try {
            await userData.save();
            res.status(200).json({ cart: userData?.products });
          } catch (e) {}
        } else {
          const items = [...userData.products, { ...product, quantity: 1 }];
          userData.products = items;
          try {
            await userData.save();
            res.status(200).json({ cart: userData?.products });
          } catch (e) {
            return res.statu(400).json({ message: e.message });
          }
        }
      } else {
        let newUserData;
        if (type === "cart") {
          newUserData = new Cart({
            user: req.body.userId,
            products: { ...req.body.product, quantity: 1 },
          });
        } else if (type === "favorite") {
          newUserData = new Favorite({
            user: req.body.userId,
            products: { ...req.body.product, quantity: 1 },
          });
        }
        try {
          await newUserData.save();
          return res.status(200).json({ cart: newUserData.products });
        } catch (e) {
          res.status(402).json((e.message = "Something went wrong"));
        }
      }
    }
  }

  async deleteProduct(req, res) {
    const userCart = await Cart.findOne({ user: req.body.userId });
    const deletedProduct = req.body.product;
    userCart.products = userCart.products.filter(
      (x) => JSON.stringify(x) !== JSON.stringify(deletedProduct)
    );
    try {
      await userCart.save();
      res.status(200).json({ cart: userCart.products });
    } catch (e) {}
  }

  async updateProduct(req, res) {
    const userCart = await Cart.findOne({ user: req.body.userId });
    const updatedProduct = req.body.product;
    userCart.products = userCart.products.map((x) =>
      x._id === updatedProduct._id &&
      x.color === updatedProduct.color &&
      x.size === updatedProduct.size
        ? { ...x, quantity: Number(req.body.quantity) }
        : x
    );
    try {
      await userCart.save();
      res.status(200).json({ cart: userCart.products });
    } catch (e) {}
  }

  async getProduct(req, res) {
    const userCart = await Cart.findOne({ user: req.body.userId });
    res.status(200).json({ cart: userCart?.products ?? [] });
  }
  async getFavProduct(req, res) {
    const userFav = await Favorite.findOne({ user: req.body.userId });
    res.status(200).json({ products: userFav?.products ?? [] });
  }

  async deleteFavorite(req, res) {
    const userCart = await Favorite.findOne({ user: req.body.userId });
    userCart.products = userCart.products.filter(
      (x) =>
        JSON.stringify({ ...x, size: 0 }) !==
        JSON.stringify({ ...req.body.product, quantity: 1, size: 0 })
    );
    try {
      await userCart.save();
      res.status(200).json({ newFavorites: userCart.products });
    } catch (e) {
      res.statu(400).json((e.message = "Something wen wrong!"));
    }
  }
}

module.exports = new CartController();
