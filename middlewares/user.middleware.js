require("dotenv").config();
const jwt = require("jsonwebtoken");
const { User } = require("../models");

const cookies = process.env.COOKIES;
const jwt_sec = process.env.JWT_SECRET;

const checkAuth = async (req, res, next) => {
  const token = req.cookies[cookies];
  if (token) {
    const decoded = jwt.verify(token, jwt_sec);
    const user = await User.findByPk(decoded.userId, {
      attributes: { exclude: ["password"] },
    });
    req.user = user;
  }
  next();
};

module.exports = { checkAuth };
