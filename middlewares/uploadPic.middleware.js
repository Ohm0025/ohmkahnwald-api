const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      new Date().getTime() +
        "" +
        Math.round(Math.random() * 10000000) +
        "." +
        file.mimetype.split("/")[1]
    );
  },
});

// const upload = multer({ dest: "public/images/" });
const upload = multer({ storage });

const uploadToCloudinary = async (req, res, next) => {
  if (!req.file) {
    return next();
  }
  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: process.env.FOLDER_PATH,
      allowed_formats: ["jpg", "png", "jpeg", "webp"],
      transformation: [{ width: 500, height: 500, crop: "limit" }],
    });
    req.cloudinaryUrl = result.secure_url;
    await unlinkFile(req.file.path);
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = { upload, uploadToCloudinary };
