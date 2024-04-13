const router = require("express").Router()
const cartController = require("../controllers/cart-controller");


router.route("/:userId").get(cartController.getAllCartItemsByUserId)

router.route("/").post(cartController.addCartItem)

module.exports = router;