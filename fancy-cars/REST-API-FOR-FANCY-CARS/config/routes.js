const carController = require("../controllers/carController");
const userController = require("../controllers/userController");
const router = require("express").Router();

router.use("/cars", carController);
router.use("/users", userController);

module.exports = router;
