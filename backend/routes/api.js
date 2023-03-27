const express = require("express");
const router = express.Router();
const userController = require("../controllers/api/user-controller");
const shoesController = require("../controllers/api/shoes-controller");
const promoCodeController = require("../controllers/api/promo-code-controller");
const productController = require("../controllers/api/product-controller");
const cartController = require("../controllers/api/cart-controller");
const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../frontend/public/uploads/");
  },
  filename: function (req, file, cb) {
    const name = Date.now() + path.extname(file.originalname);
    cb(null, name);
  },
});
let upload = multer({ storage: storage }).single("image");

router.post("/save-image", userController.saveImage);
router.post("/cancel-image", userController.cancelUpload);
router.post("/delete-image", userController.deleteImage);
router.post("/image", upload, userController.uploadImage);
router.post("/sign-in", userController.login);
router.post("/sign-up", userController.register);
router.put("/edit-data", userController.edit);
router.put("/edit-password", userController.editPassword);

router.post("/add-product", cartController.addProdcut);
router.post("/delete-product", cartController.deleteProduct);
router.post("/update-product", cartController.updateProduct);
router.post("/get-product", cartController.getProduct);
router.post("/get-fav-product", cartController.getFavProduct);
router.post("/delete-favorite", cartController.deleteFavorite);

router.post("/get-shoes", shoesController.getShoes);
router.post("/get-promocode", promoCodeController.getCode);

router.post("/fetch-product", productController.fetchProduct);
router.post("/get-search-product", productController.getProduct);
router.get("/fetch-all-products", productController.fetchAllProduct);
router.post("/add-product-db", productController.addProduct);
router.post("/get-searched-products", productController.getSearchedProduct);

module.exports = router;
