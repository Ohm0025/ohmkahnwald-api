const {
  createPostBlog,
  getCurrentPost,
  getUserPosts,
} = require("../controllers/postBlog.controller");
const express = require("express");
const { checkAuth } = require("../middlewares/user.middleware");
const router = express.Router();

router.post("/", checkAuth, createPostBlog);
router.get("/getUserPosts", checkAuth, getUserPosts);
router.get("/:postBlogId", checkAuth, getCurrentPost);

module.exports = router;
