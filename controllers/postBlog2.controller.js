const AppError = require("../utils/errorObj");
const { PostBlog, Sequelize } = require("../models");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

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
    let updatedPost;

    if (req.cloudinaryUrl) {
      const matches = selectedPost.thumbnail?.match(/\/v\d+\/(.+)$/);

      if (matches && matches[1]) {
        const publicId = matches[1].replace(/\.[^/.]+$/, "");
        await cloudinary.uploader.destroy(publicId);
      }

      updatedPost = await selectedPost.update({
        ...editedPost,
        thumbnail: req.cloudinaryUrl,
      });
    } else {
      updatedPost = await selectedPost.update({
        ...editedPost,
      });
    }
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
