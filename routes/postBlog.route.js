const {
  createPostBlog,
  getCurrentPost,
  getUserPosts,
} = require("../controllers/postBlog.controller");
const express = require("express");
const { checkAuth } = require("../middlewares/user.middleware");
const {
  upload,
  uploadToCloudinary,
} = require("../middlewares/uploadPic.middleware");
const {
  editPostBlog,
  getCarouselPost,
  getRecentPost,
} = require("../controllers/postBlog2.controller");
const router = express.Router();

router.get("/getCarouselPosts", getCarouselPost);
router.get("/getRecentPost", getRecentPost);
router.post(
  "/",
  checkAuth,
  upload.single("image"),
  uploadToCloudinary,
  createPostBlog
);
router.get("/getUserPosts", checkAuth, getUserPosts);
router.get("/:postBlogId", checkAuth, getCurrentPost);
router.patch(
  "/:postBlogId",
  checkAuth,
  upload.single("image"),
  uploadToCloudinary,
  editPostBlog
);

module.exports = router;
