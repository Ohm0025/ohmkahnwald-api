require("dotenv").config();

const express = require("express");
const cloudinary = require("cloudinary");
const AppError = require("../utils/errorObj");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.uploadImage = async (req, res, next) => {
  try {
    if (!req.file) {
      throw new AppError("No file uploaded", 400);
    }
    const result = await cloudinary.uploader.upload(req.file.path);
    res
      .status(201)
      .json({ imageUrl: result.secure_url, publicId: result.public_id });
  } catch (err) {
    next(err);
  }
};
