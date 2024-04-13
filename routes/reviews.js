const router = require("express").Router()
const reviewController = require("../controllers/review-controller");


router.route("/:productId").get(reviewController.getAllReviewsByProductId);


module.exports = router;