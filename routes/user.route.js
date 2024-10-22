const {
  getUser,
  createUser,
  verifyEmail,
  resendCode,
} = require("../controllers/user.controller");

const express = require("express");
const { updateUserProfile } = require("../controllers/user2.controller");

const router = express.Router();

router.get("/", getUser);
router.post("/register", createUser);
router.post("/verify-email", verifyEmail);
router.get("/verify-resend", resendCode);
router.patch("/updateProfile", updateUserProfile);

module.exports = router;
