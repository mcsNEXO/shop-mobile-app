const Product = require("../../db/models/product");

class ShoesController {
  async getShoes(req, res) {
    const sortingData = req.body.sortingData;
    try {
      const shoes = await Product.aggregate([
        {
          $unwind: "$colors",
        },
        {
          $match: {
            $and: [
              {
                "colors.color": sortingData.colors
                  ? { $in: sortingData.colors.split(",") }
                  : { $exists: true },
              },
              {
                "colors.sizes.size": sortingData.size
                  ? { $in: sortingData.size.split(",") }
                  : { $exists: true },
              },
              {
                gender: sortingData.gender
                  ? sortingData.gender
                  : { $exists: true },
              },
              { type: sortingData.type ? sortingData.type : { $exists: true } },
              {
                category: sortingData.category
                  ? sortingData.category
                  : { $exists: false },
              },
              {
                price: sortingData?.price
                  ? {
                      $gte: Number(sortingData?.price.split("-")[0]),
                      $lte: Number(sortingData.price.split("-")[1]),
                    }
                  : { $exists: true },
              },
            ],
          },
        },
        {
          $addFields: {
            "colors.sizes": sortingData.size && {
              $filter: {
                input: "$colors.sizes",
                as: "size",
                cond: { $in: ["$$size.size", sortingData.size.split(",")] },
              },
            },
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
            colors: { $push: "$colors" },
          },
        },
        {
          $sort:
            sortingData.sort === "high-low" || sortingData.sort === "low-high"
              ? { price: sortingData.sort === "high-low" ? -1 : 1 }
              : sortingData.sort === "date"
              ? { createdAt: 1 }
              : { type: 1 },
        },
      ]);
      return res.status(200).json({ shoes: shoes });
    } catch (e) {
      console.log(e);
      return res.status(400).json({
        message: [{ message: "Cannot find any products", message2: e.message }],
      });
    }
  }
}

module.exports = new ShoesController();
