import express from 'express';
import multer from 'multer';
import { storage } from '../cloudinary.js';
import profileUpdate from '../controllers/profileUpdate.js';
import authenticated from '../authentication/authenticated.js';

const upload = multer({ storage });

const router = express.Router();

router.put('/users/profile', authenticated, upload.single('profilePicture'), profileUpdate);

export default router;
