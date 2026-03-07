const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");

// CLOUDINARY CONFIG
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key:    process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

// UPLOAD FILE TO CLOUDINARY (image or video)
const uploadToCloudinary = (buffer, options = {}) => {
  return new Promise((resolve, reject) => {

    if (!buffer) {
      return reject(new Error("File buffer is missing"));
    }

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder:        options.folder       || "cashify/products",
        resource_type: options.resourceType || "auto",

        // Compress image or video automatically
        transformation: options.resourceType === "video"
          ? [{ quality: "auto", fetch_format: "mp4" }]
          : [{ quality: "auto", fetch_format: "auto" }],
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );

    streamifier.createReadStream(buffer).pipe(uploadStream);
  });
};

module.exports = uploadToCloudinary;