require("dotenv").config();
const jwt = require("jsonwebtoken");

// The site (ohmkahnwald.com) and the API (Railway) are on different domains,
// so the auth cookie must be Secure + SameSite=None.
// Browsers only delete a cookie when the clearing Set-Cookie header uses the
// SAME attributes it was set with — so set and clear share these options.
const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: true,
  sameSite: "none",
  path: "/",
};

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
    ...COOKIE_OPTIONS,
    maxAge: 3600000 * 24,
  });
};

exports.setCookiesOut = (res) => {
  res.clearCookie(process.env.COOKIES, COOKIE_OPTIONS);
};
