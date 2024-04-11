const router = require("express").Router();
const userController = require('../controllers/user-controller');

router.route("/dashboard").get(userController.authorize, userController.getDashboard);


router.route("/signup").post(userController.signup)
router.route("/login").post(userController.login)

module.exports = router;