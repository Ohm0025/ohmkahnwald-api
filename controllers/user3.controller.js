const { User, PostBlog, Friend } = require("../models");
const { Op } = require("sequelize");
const AppError = require("../utils/errorObj");

exports.getAnotherByUsername = async (req, res, next) => {
  try {
    const { inputText } = req.params;
    const userId = req.userId;
    const findUser = await User.findAll({
      where: {
        [Op.and]: [
          {
            username: {
              [Op.like]: `%${inputText}%`,
            },
          },
          {
            userId: {
              [Op.ne]: userId,
            },
          },
        ],
      },
      attributes: ["username", "imgProfile"],
      order: [["username", "ASC"]],
    });
    res.status(200).json({ findUser });
  } catch (err) {
    next(err);
  }
};

exports.getAnotherUser = async (req, res, next) => {
  try {
    const { username } = req.params;

    if (!username) {
      throw new AppError("no username", 401);
    }

    const selectedUser = await User.findOne({
      where: { username },
      attributes: ["username", "imgProfile"],
      include: [
        {
          model: PostBlog,
          attributes: ["postBlogId"],
        },
      ],
    });

    if (!selectedUser) {
      throw new AppError("no username found", 404);
    }
    res.status(200).json({ selectedUser });
  } catch (err) {
    next(err);
  }
};

exports.sendFriendRequest = async (req, res, next) => {
  try {
    const { username } = req.params;
    const userId = req.userId;
    if (!userId) {
      throw new AppError("This feature need to login first", 401);
    }
    if (!username) {
      throw new AppError("no username", 401);
    }
    const findUser = await User.findOne({
      where: { username },
      attributes: ["username", "userId"],
    });

    if (!findUser) {
      throw new AppError("user not found", 404);
    }

    const result = await Friend.create({
      senderId: userId,
      recieverId: findUser.userId,
    });

    res.status(200).json({ result });
  } catch (err) {
    next(err);
  }
};
