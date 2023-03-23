const { compareSync } = require("bcrypt");
const { copyFileSync } = require("fs");
const Shoes = require("../../db/models/shoes");
class ShoesController {
  async getShoes(req, res) {
    const url = req.body.url;
    console.log("url", url);
    let shoes = await Shoes.find();
    if (url !== "") {
      shoes = await Shoes.aggregate([
        {
          $project: {
            _id: 1,
            name: 1,
            type: 1,
            colors: url.colors
              ? {
                  $setIntersection: ["$colors", url.colors?.split(",")],
                }
              : 1,
            price: 1,
            image: 1,
            size: url.size
              ? {
                  $setIntersection: [
                    "$size",
                    url.size?.split(",")?.map((el) => parseInt(el)),
                  ],
                }
              : 1,
            image: 1,
            gender: 1,
            index: 1,
            date: 1,
            category: 1,
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
              url.gender.length > 0 ? { $in: url.gender } : { $exists: true },
            price: url.price
              ? {
                  $gt: Number(url?.price.split("-")[0]),
                  $lt: Number(url.price.split("-")[1]),
                }
              : { $exists: true },
          },
        },
        {
          $sort: {
            price: url.sort === "high-low" ? 1 : -1,
          },
        },
      ]);
    }
    console.log(shoes);
    return res.status(200).json({ shoes });
  }
}

module.exports = new ShoesController();
