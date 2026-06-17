const { v2 : cloudinary } = require("cloudinary");
const dotenv = require("dotenv");
dotenv.config();
const uploadOnCloudinary = async (filePath) => {
    try {
      cloudinary.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
      });
  
      const uploadResult = await cloudinary.uploader.upload(filePath);
  
      return uploadResult.secure_url;
    } catch (error) {
      console.log("Cloudinary Error:", error);
      throw error;
    }
  };
module.exports= uploadOnCloudinary;