const express = require("express");
const userRoute = require("./user.route");
const authRoute = require("./auth.route");
const postBlogRoute = require("./postBlog.route");
const imageRoute = require("./image.route");
const { checkAuth } = require("../middlewares/user.middleware");

const router = express.Router();

router.use("/user", checkAuth, userRoute);
router.use("/auth", authRoute);
router.use("/postBlog", checkAuth, postBlogRoute);
router.use("/image", imageRoute);

module.exports = router;
