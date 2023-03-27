const Shoes = require("../../db/models/shoes");
class ProductController {
  async fetchProduct(req, res) {
    try {
      const product = await Shoes.findOne({ _id: req.body.idProduct });
      return res.status(200).json({ product });
    } catch (e) {
      return res.status(402).json({ message: "Cannot find this product" });
    }
  }

  async getSearchedProduct(req, res) {
    const params = { ...req.body, color: ["white"] };
    console.log("params", params);
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
                  $setIntersection: ["$colors", params.colors?.split(",")],
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
              params.gender.length > 0
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
          },
        },
        {
          $sort: {
            price: params.sort === "high-low" ? 1 : -1,
          },
        },
      ]);
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
      } else {
        return res
          .status(400)
          .json({ message: "Can't find this type of products!" });
      }
      return res.status(200).json({ products });
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
