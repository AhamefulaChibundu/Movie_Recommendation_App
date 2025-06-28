import express from 'express';
import profileControl from '../controllers/getProfile.js';
import authenticated from '../authentication/authenticated.js';

const router = express.Router();

router.get('/profile/', authenticated, profileControl);

export default router;