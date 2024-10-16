import cloudinary from "../config/cloudinary.js";

export const cloudinaryUpload = async (file, folderName) => {
  const result = await cloudinary.uploader.upload(file.tempFilePath, {
    resource_type: "auto",
    folder: folderName,
  });

  return result;
};
