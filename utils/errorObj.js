module.exports = class AppError extends Error {
  constructor(message, statusCode, des = "") {
    super(message);
    this.statusCode = statusCode;
    this.des = des;
  }
};
