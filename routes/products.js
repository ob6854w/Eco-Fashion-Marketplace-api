const router = require("express").Router()
const productController = require("../controllers/product-controller");


router.route("/").get(productController.index)


router.route("/:id").get(productController.findOne)


// router.route("/products/search").get()

module.exports = router;