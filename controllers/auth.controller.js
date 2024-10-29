const { User } = require("../models");
const { setCookiesIn, setCookiesOut } = require("../utils/handleCookies");
const AppError = require("../utils/errorObj");

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      where: { email, password },
      attributes: { exclude: ["password"] },
    });
    if (!user) {
      throw new AppError("Email or Password is incorrect", 401, "des test");
    }
    setCookiesIn(user, res);
    res.status(200).json({
      message: "Login Success",
      des: `welcome ${user.username}`,
      success: true,
      username: user.username,
      email: user.email,
      bio: user.bio,
      isVerified: user.isVerified,
      imgProfile: user.imgProfile,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

exports.logout = async (req, res, next) => {
  try {
    setCookiesOut(res);
    res.status(200).json({ message: "logout success" });
  } catch (err) {
    console.error(err);
    next(err);
  }
};
