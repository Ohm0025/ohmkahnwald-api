require("dotenv").config();
const jwt = require("jsonwebtoken");

const cookies = process.env.COOKIES;
const jwt_sec = process.env.JWT_SECRET;

const checkAuth = async (req, res, next) => {
  if (req.cookies) {
    const token = req.cookies[cookies];
    if (token) {
      const decoded = jwt.verify(token, jwt_sec);
      req.userId = decoded.userId;
    }

    console.log(req.cookies);
    console.log(token);
  }

  next();
};

module.exports = { checkAuth };
