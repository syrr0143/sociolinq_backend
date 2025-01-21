import cloudinary from "../config/cloudinaryConfig.js";

export const uploadToCloudinary = (file) => {
  console.log("inside file upload");
  return new Promise((resolve, reject) => {
    cloudinary.v2.uploader
      .upload_stream({ resource_type: "auto" }, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      })
      .end(file.buffer);
  });
};
