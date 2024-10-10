const { User } = require("../models");
const { checkExpiredCode } = require("../utils/checkExpire");
const AppError = require("../utils/errorObj");
const { setCookiesIn } = require("../utils/handleCookies");
const sendVerificationEmail = require("../utils/sendingEmail");

exports.getUser = async (req, res, next) => {
  try {
    const user = req.user;
    if (user) {
      return res.status(200).json({ message: "get user success", user });
    }
    res.status(200).json({
      message: "get user without authen as guess",
      user: false,
    });
  } catch (err) {
    next(err);
  }
};

exports.createUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const user = req.user;
    if (user) {
      throw new AppError(
        "You already login , please logout before register",
        401
      );
    }
    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
    const createdUser = await User.create({
      username,
      email,
      password,
      verifyCode,
    });
    const emailResult = await sendVerificationEmail(
      createdUser.email,
      createdUser.verifyCode
    );
    if (emailResult.accepted[0] === email) {
      setCookiesIn(createdUser);
      return res.status(201).json({
        message: "Register Success",
        description:
          'Please Wait about 1-2 min and Check your email for the verification code"',
      });
    }
    throw new AppError("Register Failed , Please correct your email", 401);
  } catch (err) {
    next(err);
  }
};

exports.verifyEmail = async (req, res, next) => {
  try {
    const { code } = req.body;
    const user = req.user;

    if (!user) {
      throw new AppError("Please login by registered email", 401);
    }
    if (!!user.isVerified) {
      checkExpiredCode(user.updatedAt);
      throw new AppError(
        "This email already verified , You can login now",
        401
      );
    }
    if (user.verifyCode !== code) {
      throw new AppError("Verify Code incorrect", 401);
    }
    if (checkExpiredCode(user.updatedAt) > 2) {
      throw new AppError(
        "This code just expired , Please resend for new code",
        401
      );
    }

    await user.update({ isVerified: true });

    if (user.isVerified) {
      return res.status(200).json({ message: "Email verified success" });
    } else {
      throw new AppError(
        "Email verification Error , Please try again later",
        500
      );
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
};

exports.resendCode = async (req, res, next) => {
  try {
    const user = req.user;
    if (!user) {
      throw new AppError("Please login by registered email", 401);
    }
    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
    await user.update({ verifyCode });
    res.status(200).json({ user });
  } catch (err) {
    console.error(err);
    next(err);
  }
};
