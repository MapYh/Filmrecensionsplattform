const { Router } = require("express");
const { signup, login } = require("../controllers/user-controller");
/* const { auth } = require("../routes/user-routes"); */
const router = Router();

router.use("/signup", signup);
router.use("/login", login);

module.exports = router;
