const natural = require("natural");

const searchProducts = (keyWord, products) => {
  let results = [];

  //Checking if given product contains the given keyword

  for (let i = 0; i < products?.length; i++) {
    if (products[i].name.toLowerCase().includes(keyWord.toLowerCase())) {
      results.push(products[i]);
    }
  }

  //If no results are found, check for similar words using the Levenshtein algorithm

  if (results.length === 0) {
    for (let i = 0; i < products.length; i++) {
      if (
        natural.LevenshteinDistance(
          keyWord.toLowerCase(),
          products[i].name.toLowerCase()
        ) <= 2
      ) {
        results.push(products[i]);
      }
    }
  }
  return results;
};

module.exports = searchProducts;
