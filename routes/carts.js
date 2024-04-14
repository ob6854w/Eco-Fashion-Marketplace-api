const router = require("express").Router()
const cartController = require("../controllers/cart-controller");


router.route("/:userId").get(cartController.getAllCartItemsByUserId)

router.route("/").post(cartController.addCartItem)

router.route("/:id").delete(cartController.deleteCartItem);

module.exports = router;