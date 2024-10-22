const express = require("express");
const router = express.Router();
const upload = require("../middlewares/image.middleware");
const { uploadImage } = require("../controllers/image.controller");

router.post("/uploadImage", upload.single("image"), uploadImage);

module.exports = router;
