const express = require("express");
const userRoute = require("./user.route");
const authRoute = require("./auth.route");
const { checkAuth } = require("../middlewares/user.middleware");

const router = express.Router();

router.use("/user", checkAuth, userRoute);
router.use("/auth", authRoute);

module.exports = router;
