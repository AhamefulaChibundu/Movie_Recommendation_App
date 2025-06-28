import express from 'express';
import profileUpdate from '../controllers/profileUpdate.js';
import authenticated from '../authentication/authenticated.js';
const router = express.Router();

router.put('/profile', authenticated, profileUpdate);

export default router;