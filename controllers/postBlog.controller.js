const AppError = require("../utils/errorObj");
const { PostBlog } = require("../models");

exports.createPostBlog = async (req, res, next) => {
  try {
    const userId = req.userId;
    const postData = req.body;
    if (!userId) {
      throw new AppError(
        "This feature allow to member only , Please login first",
        400
      );
    }
    const post = await PostBlog.create({
      ...postData,
      userId,
    });
    if (post.postBlogId) {
      return res.status(201).json({ post });
    }
  } catch (err) {
    next(err);
  }
};

exports.getCurrentPost = async (req, res, next) => {
  try {
    const { postBlogId } = req.params;
    const userId = req.userId;
    const post = PostBlog.findByPk(postBlogId);
    if (post.publicity) {
      return res.status(200).json({ post });
    } else if (userId) {
      if ("user is subscribe") {
        return res.status(200).json({ post });
      }
      throw new AppError(
        "This post is private , please subscribe author first",
        402
      );
    } else {
      throw new AppError("This post is private , please login first", 402);
    }
  } catch (err) {
    next(err);
  }
};

exports.getUserPosts = async (req, res, next) => {
  try {
    const userId = req.userId;
    if (!userId) {
      throw new AppError(
        "This feature allow to member only , Please login first",
        400
      );
    }

    const userPosts = await PostBlog.findAll({ where: { userId } });
    console.log(userPosts);
    return res.status(200).json({ userPosts });
  } catch (err) {
    next(err);
  }
};
