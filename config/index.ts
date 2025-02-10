// Backend: Server-side code example for Cloudinary upload
import cloudinary from 'cloudinary';

// Configuration of Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Use Cloudinary to upload an image
const uploadImage = async (file: any) => {
  try {
    const uploadResult = await cloudinary.uploader.upload(file);
    return uploadResult.secure_url;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw new Error('Failed to upload image');
  }
};
