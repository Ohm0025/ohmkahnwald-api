const { User } = require("../models");
const AppError = require("../utils/errorObj");

exports.updateUserProfile = async (req, res, next) => {
  try {
    const userId = req.userId;
    const { updatedObj } = req.body;
    if (!userId) {
      throw new AppError("Please login first", 401);
    }
    const result = await User.update(updatedObj, {
      where: { userId: userId },
    });
    res.status(202).json({ result });
  } catch (err) {
    next(err);
  }
};
