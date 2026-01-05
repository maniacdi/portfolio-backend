import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'dblcttl2g',
  api_key: process.env.CLOUDINARY_API_KEY || '179867458188812',
  api_secret: process.env.CLOUDINARY_API_SECRET || '3begUYsGHSOWcYKpItk9qxmdNP4',
  secure: true
});

export default cloudinary;