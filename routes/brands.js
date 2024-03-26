const router = require("express").Router();
const brandController = require("../controllers/brand-controller");

router.route("/").get(brandController.index);

router.route("/:id").get(brandController.findOne);

router.route("/:id/products").get();
module.exports = router;
