const AppError = require("../utils/errorObj");
const { PostBlog, Sequelize } = require("../models");

exports.editPostBlog = async (req, res, next) => {
  try {
    const postBlogId = req.params.postBlogId;
    const userId = req.userId;
    const editedPost = req.body;

    if (!userId) {
      throw new AppError(
        "This feature allow to member only , Please login first",
        400
      );
    }
    const selectedPost = await PostBlog.findOne({
      where: {
        postBlogId,
        userId,
      },
    });
    if (!selectedPost) {
      throw new AppError("Post not found", 404);
    }
    const updatedPost = await selectedPost.update({
      ...editedPost,
      thumbnail: req.cloudinaryUrl,
    });
    res.status(201).json({ post: updatedPost });
  } catch (err) {
    next(err);
  }
};

exports.getCarouselPost = async (req, res, next) => {
  try {
    const posts = await PostBlog.findAll({
      order: Sequelize.literal("RAND()"),
      limit: 5,
    });
    res.status(201).json({ posts });
  } catch (err) {
    next(err);
  }
};

exports.getRecentPost = async (req, res, next) => {
  try {
    const posts = await PostBlog.findAll({
      order: [["createdAt", "DESC"]],
      limit: 12,
    });
    res.status(201).json({ posts });
  } catch (err) {
    next(err);
  }
};
