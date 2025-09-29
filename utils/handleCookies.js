require("dotenv").config();
const jwt = require("jsonwebtoken");

exports.setCookiesIn = (user, res) => {
  //add cookies
  const token = jwt.sign(
    { userId: user.userId, isVerified: user.isVerified },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );
  res.cookie(process.env.COOKIES, token, {
    httpOnly: true,
    secure: true,
    maxAge: 3600000 * 24,
  });
};

exports.setCookiesOut = (res) => {
  res.clearCookie(process.env.COOKIES);
};
