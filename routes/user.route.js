const {
  getUser,
  createUser,
  verifyEmail,
  resendCode,
} = require("../controllers/user.controller");
const {
  upload,
  uploadToCloudinary,
} = require("../middlewares/uploadPic.middleware");

const express = require("express");
const {
  updateUserProfile,
  updateImgProfile,
} = require("../controllers/user2.controller");
const {
  getAnotherByUsername,
  getAnotherUser,
  sendFriendRequest,
} = require("../controllers/user3.controller");

const router = express.Router();

router.get("/", getUser);
router.get("/another-user", getAnotherByUsername);
router.post("/register", createUser);
router.post("/verify-email", verifyEmail);
router.get("/verify-resend", resendCode);
router.patch("/updateProfile", updateUserProfile);
router.patch(
  "/updateImgProfile",
  upload.single("image"),
  uploadToCloudinary,
  updateImgProfile
);
router.get("/get-another-user/:username", getAnotherUser);
router.get("/send-friend-request/:username", sendFriendRequest);

module.exports = router;
