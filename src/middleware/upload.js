import multer from 'multer';
import { storage } from '../lib/cloudinary.js';

export const upload = multer({ 
  storage: storage,
  limits: { fileSize: 2 * 1024 * 1024 } 
});