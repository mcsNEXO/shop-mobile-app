const Shoes = require("../../db/models/shoes");
const searchProducts = require("../../functions/searchProductByName");

class ProductController {
  async fetchProduct(req, res) {
    try {
      const product = await Shoes.findOne({ _id: req.body.productId });
      return res.status(200).json({ product });
    } catch (e) {
      return res.status(402).json({ message: "Cannot find this product" });
    }
  }
  async getSearchedNamesOfProducts(req, res) {
    const inputString = req.body.inputText;
    let products;
    try {
      if (inputString)
        products = await Shoes.find(
          { name: { $regex: inputString } },
          { name: 1 }
        );
      else products = await Shoes.find({}, { name: 1 });
      return res.status(200).json({ products });
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  }
  async getSearchedProduct(req, res) {
    const params = { ...req.body };
    const obj = new Object();
    if (params.sort) obj[params.sort.value] = params.sort.sort;
    let products;
    try {
      products = await Shoes.aggregate([
        {
          $project: {
            _id: 1,
            name: 1,
            type: 1,
            colors: params?.colors
              ? {
                  $setIntersection: ["$colors", params.colors],
                }
              : 1,
            price: 1,
            image: 1,
            size: params.size
              ? {
                  $setIntersection: [
                    "$size",
                    params.size?.split(",")?.map((el) => parseInt(el)),
                  ],
                }
              : 1,
            image: 1,
            gender: 1,
            category: 1,
            index: 1,
            date: 1,
          },
        },
        {
          $match: {
            "colors.0": {
              $exists: true,
            },
            "size.0": {
              $exists: true,
            },
            gender:
              params.gender.length > 0 && params.gender[0] !== null
                ? {
                    $in: params.gender,
                  }
                : { $exists: true },
            category: params.category ? params.category : { $exists: true },
            type: params.type ? params.type : { $exists: true },
            price: params.price
              ? {
                  $gt: Number(params?.price.split("-")[0]),
                  $lt: Number(params.price.split("-")[1]),
                }
              : { $exists: true },
            // name: params.inputText ?  { $regex: `.*${params.inputText}.*`, $options: "i" } : {exists:true},
          },
        },
        {
          $sort: params.sort ? obj : { date: 1 },
        },
      ]);
      if (params.inputText) {
        products = searchProducts(params.inputText, products);
      }
      return res.status(200).json({ products });
    } catch (err) {
      console.log(err);
    }
  }

  async getProduct(req, res) {
    let products;
    try {
      if (req.body.type === "shoes") {
        products = await Shoes.find({
          // type: req.body.type,
          $text: { $search: `"${req.body.text}"` },
        });
        return res.status(200).json({ products });
      } else {
        return res
          .status(400)
          .json({ message: "Can't find this type of products!" });
      }
    } catch (e) {
      return res.status(400).json({ message: e.message });
    }
  }

  async fetchAllProduct(req, res) {
    try {
      const products = await Shoes.find().limit(5);
      return res.status(200).json({ products });
    } catch (e) {
      return res.status(402).json({ message: "Something went wrong" });
    }
  }
  async addProduct(req, res) {
    const data = req.body;
    let exist = await Shoes.findOne({
      name: data.nameProduct.toLowerCase().trim(),
      gender: data.gender,
    });
    if (exist) {
      return res.status(401).json({ message: "These shoes already exist!" });
    }
    try {
      if (data.type === "shoes") {
        const newShoes = new Shoes({
          gender: data.gender,
          name: data.nameProduct,
          colors: data.colors,
          price: data.price,
          size: data.size,
          image: data.colors.map(
            (el) =>
              `${data.type}-${data.nameProduct
                .trim()
                .replace(/ /g, "-")}-${el}.png`
          ),
          type: data.type,
        });
        await newShoes.save();
      }
      return res.status(200).json({ message: "ok" });
    } catch (e) {
      console.log("e", e);
      e.code === 11000 ? (e.message = "These shoes already exist!") : e.message;
      return res.status(401).json({ message: e.message });
    }
  }
}

module.exports = new ProductController();
