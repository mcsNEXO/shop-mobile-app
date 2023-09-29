const searchProducts = require("../../functions/searchProductByName");

const Product = require("../../db/models/product");
class ProductController {
  async fetchProduct(req, res) {
    try {
      const product = await Product.findOne({
        _id: req.body.idProduct,
      });
      return res.status(200).json({ product });
    } catch (e) {
      return res.status(402).json({ message: "Cannot find this product" });
    }
  }
  async fetchAllProduct(req, res) {
    try {
      const products = await Product.find().limit(5);
      return res.status(200).json({ products });
    } catch (e) {
      return res.status(402).json({ message: "Something went wrong" });
    }
  }

  async getSearchedProduct(req, res) {
    const sortingData = { ...req.body };
    const obj = new Object();
    if (sortingData.sort) obj[sortingData.sort.value] = sortingData.sort.sort;
    console.log(sortingData);
    let products;
    try {
      products = await Product.aggregate([
        {
          $match: {
            $and: [
              {
                gender: sortingData?.gender
                  ? sortingData?.gender
                  : { $exists: true },
              },
              {
                type: sortingData?.type ? sortingData?.type : { $exists: true },
              },
              {
                category: sortingData?.category
                  ? sortingData?.category
                  : { $exists: true },
              },
            ],
          },
        },
        {
          $group: {
            _id: "$_id",
            name: { $first: "$name" },
            gender: { $first: "$gender" },
            type: { $first: "$type" },
            category: { $first: "$category" },
            price: { $first: "$price" },
            colors: { $first: "$colors" },
          },
        },
      ]);
      console.log(products);
      if (sortingData.inputText) {
        products = searchProducts(sortingData.inputText, products);
      }
      return res.status(200).json({ products });
    } catch (err) {
      console.log(err);
    }
  }

  async addProduct(req, res) {
    const data = req.body;
    // let exist = await Product.findOne({
    // name: data.nameProduct.toLowerCase().trim(),
    // gender: data.gender,
    // });
    // if (exist) {
    //   return res.status(401).json({ message: "These shoes already exist!" });
    // }
    try {
      const product = new Product({
        name: data.name,
        type: data.type,
        category: data.category,
        gender: data.gender,
        price: data.price,
        colors: data.size.map((item) => {
          return {
            ...item,
            image: `${data.type}-${data.name.trim().replace(/ /g, "-")}-${
              item.color
            }.png`,
          };
        }),
        description: data.description,
      });
      await product.save();
      return res.status(200).json({ message: "ok" });
    } catch (e) {
      console.log("e", e);
      e.code === 11000 ? (e.message = "These shoes already exist!") : e.message;
      return res.status(401).json({ message: e.message });
    }
  }
}

module.exports = new ProductController();
