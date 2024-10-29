const { User } = require("../models");
const AppError = require("../utils/errorObj");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.updateUserProfile = async (req, res, next) => {
  try {
    const userId = req.userId;
    const { updatedObj } = req.body;
    if (!userId) {
      throw new AppError("Please login first", 401);
    }
    const result = await User.update(updatedObj, {
      where: { userId: userId },
    });
    res.status(201).json({ result });
  } catch (err) {
    next(err);
  }
};

exports.updateImgProfile = async (req, res, next) => {
  try {
    const userId = req.userId;
    if (!userId) {
      throw new AppError("Please login first", 401);
    }
    const imageUrl = req.cloudinaryUrl;
    const oldImage = await User.findByPk(userId);

    const matches = oldImage.imgProfile?.match(/\/v\d+\/(.+)$/);

    if (matches && matches[1]) {
      const publicId = matches[1].replace(/\.[^/.]+$/, "");
      await cloudinary.uploader.destroy(publicId);
    }

    const result = await User.update(
      { imgProfile: imageUrl },
      { where: { userId } }
    );
    res.status(201).json({ result: imageUrl });
  } catch (err) {
    next(err);
  }
};
