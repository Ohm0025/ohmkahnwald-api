require("dotenv").config();
const jwt = require("jsonwebtoken");

const cookies = process.env.COOKIES;
const jwt_sec = process.env.JWT_SECRET;

const checkAuth = async (req, res, next) => {
  const token = req.cookies[cookies];

  if (token) {
    const decoded = jwt.verify(token, jwt_sec);
    req.userId = decoded.userId;
  }

  next();
};

module.exports = { checkAuth };
