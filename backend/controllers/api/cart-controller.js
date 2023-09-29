const Cart = require("../../db/models/cart");
const Product = require("../../db/models/product");
const Favorite = require("../../db/models/favorite");

class CartController {
  async getUserProducts(req, res) {
    try {
      let type = req.body.type;
      const userProducts =
        type === "favorite"
          ? await Favorite.findOne({
              user: req.body.userId,
            }).populate("products.productId")
          : await Cart.findOne({
              user: req.body.userId,
            }).populate("products.productId");

      const products = userProducts?.products?.map((mappedProduct) => {
        const { productId, color, size, quantity } = mappedProduct;
        let currentColorObj = productId?.colors?.find(
          (item) => item.color === color
        );
        if (type === "cart") {
          currentColorObj.sizes = currentColorObj?.sizes?.find(
            (item) => Number(item.size) === Number(size)
          );
        }

        return {
          size,
          quantity: quantity && quantity,
          product: {
            _id: productId._id,
            name: productId.name,
            gender: productId.gender,
            type: productId.type,
            category: productId.category,
            price: productId.price,
            colors: currentColorObj,
            description: productId.description,
            createdAt: productId.createdAt,
            updatedAt: productId.updatedAt,
          },
        };
      });
      return res.status(200).json({ products });
    } catch (err) {
      console.log(err);
      return res.status(400).json({ message: "Problems" });
    }
  }

  async addProdcut(req, res) {
    let type = req.body.type;
    let userData;
    if (type === "cart") {
      userData = await Cart.findOne({ user: req.body.product.userId });
    } else if (type === "favorite") {
      userData = await Favorite.findOne({ user: req.body.product.userId });
    } else {
      return res.status(400).json({ message: "Wrong type" });
    }

    const { productId, userId, color, size, quantity } = req.body.product;
    if (userData?.user) {
      const exist =
        type === "cart"
          ? userData.products?.find(
              (x) =>
                x.productId.toString() === productId &&
                x.color === color &&
                Number(x.size) === Number(size)
            )
          : userData.products?.find(
              (x) => x.productId === productId && x.color === color
            );

      if (exist) {
        if (type === "favorite")
          return res
            .status(400)
            .json({ message: "You have this product already" });
        userData.products = userData?.products.map((productCart) =>
          String(productCart.productId) === productId &&
          Number(productCart.size) === Number(size)
            ? {
                ...productCart,
                quantity:
                  productCart.quantity + quantity < 10
                    ? productCart.quantity + quantity
                    : 10,
              }
            : productCart
        );
        try {
          await userData.save();
          return res.status(200).json({
            message: "Product has been added to cart",
            products: userData.products,
          });
        } catch (err) {
          console.log(err);
        }
      } else {
        const newProduct =
          type === "cart"
            ? {
                productId: productId,
                color: color,
                size: size,
                quantity: 1,
              }
            : {
                productId: productId,
                color: color,
                size: size,
              };
        try {
          userData.products.push(newProduct);
          await userData.save();
          return res.status(200).json({
            message: "Products has been added to favorites",
            products: userData.products,
          });
        } catch (e) {
          console.log(e);
          return res.status(400).json({ message: e.message });
        }
      }
    } else {
      let newTypeProduct;
      if (req.body.type === "cart") {
        newTypeProduct = await Cart.create({
          products: {
            productId: productId,
            color: color,
            size: size,
            quantity: 1,
          },
          user: userId,
        });
      } else if (req.body.type === "favorite") {
        newTypeProduct = await Favorite.create({
          products: {
            productId: productId,
            color: color,
            size: size,
          },
          user: userId,
        });
      }
      try {
        await newTypeProduct.save();
        return res.status(200).json({
          message: "Product has been added to favorites",
          products: newTypeProduct.products,
        });
      } catch (err) {
        return res.status(400).json({ message: "Problems" });
      }
    }
  }

  async getProductsCartNotLoggedUser(req, res) {
    const resultArray = [];
    for (const item of req.body.products) {
      const productId = item.productId;
      const product = await Product.findOne({ _id: productId });
      const { color, size, quantity } = item;
      let currentColorObj = product.colors.find((item) => item.color === color);
      currentColorObj.sizes = currentColorObj.sizes?.find(
        (item) => Number(item.size) === Number(size)
      );
      if (product) {
        resultArray.push({
          size,
          quantity: quantity && quantity,
          product: {
            _id: product._id,
            name: product.name,
            gender: product.gender,
            type: product.type,
            category: product.category,
            price: product.price,
            colors: currentColorObj,
            description: product.description,
            createdAt: product.createdAt,
            updatedAt: product.updatedAt,
          },
        });
      } else {
        console.log(`Nie znaleziono produktu o ID: ${productId}`);
      }
    }
    return res.status(200).json({ products: resultArray });
  }

  async deleteProduct(req, res) {
    console.log("auth", req.session);
    const userCart = await Cart.findOne({ user: req.body.userId });
    userCart.products = userCart.products.filter(
      (x) =>
        JSON.stringify(x) !==
        JSON.stringify({ ...req.body.product, _id: x._id })
    );
    try {
      await userCart.save();
      return res.status(200).json({ products: userCart.products });
    } catch (e) {
      return res.status(400).json({ message: "Problems" });
    }
  }

  async updateQuantityProduct(req, res) {
    const userCart = await Cart.findOne({ user: req.body.userId });
    const updatedProduct = req.body.product;
    userCart.products = userCart.products.map((x) =>
      x.productId.toString() === updatedProduct.productId &&
      x.color === updatedProduct.color &&
      x.size === updatedProduct.size
        ? { ...x, quantity: Number(updatedProduct.quantity) }
        : x
    );
    try {
      await userCart.save();
      return res.status(200).json({ products: userCart.products });
    } catch (e) {
      return res.status(400).json({ message: "Problems" });
    }
  }

  async getProduct(req, res) {
    try {
      const userCart = await Cart.findOne({ user: req.body.userId });
      return res.status(200).json({ products: userCart?.products });
    } catch (e) {
      return res.status(400).json({ message: "Problems" });
    }
  }
  async getFavProduct(req, res) {
    const userFav = await Favorite.findOne({ user: req.body.userId });
    res.status(200).json({ products: userFav?.products ?? [] });
  }

  async deleteFavorite(req, res) {
    const userCart = await Favorite.findOne({ user: req.body.userId });
    userCart.products = userCart.products.filter(
      (x) =>
        JSON.stringify(x) !==
        JSON.stringify({ ...req.body.product, size: x.size, _id: x._id })
    );
    try {
      await userCart.save();
      return res.status(200).json({ products: userCart.products });
    } catch (e) {
      return res.statu(400).json((e.message = "Something wen wrong!"));
    }
  }
}

module.exports = new CartController();
