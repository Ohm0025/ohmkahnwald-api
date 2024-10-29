const { User } = require("../models");
const { Op } = require("sequelize");

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
