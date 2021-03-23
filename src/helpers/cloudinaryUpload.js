require('dotenv').config();
const cloudinary = require('cloudinary').v2;
const fs = require('fs');

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadCloudinary = (file) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(file, async (err, result) => {
      if(err) return reject();

      fs.unlinkSync(file);
      return resolve(result);
    });
  });
}

module.exports = { 
  uploadCloudinary,
}