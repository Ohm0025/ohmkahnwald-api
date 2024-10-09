const {
  getUser,
  createUser,
  verifyEmail,
  resendCode,
} = require("../controllers/user.controller");

const express = require("express");

const router = express.Router();

router.get("/", getUser);
router.post("/register", createUser);
router.post("/verify-email", verifyEmail);
router.get("/verify-resend", resendCode);

module.exports = router;
