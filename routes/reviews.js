const router = require("express").Router()
const reviewController = require("../controllers/review-controller");


router.route("/").get(reviewController.index)


router.route("/:id").get(reviewController.findOne)


// router.route("/products/search").get()

module.exports = router;