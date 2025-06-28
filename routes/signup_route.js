import express from 'express';
import signupControl from '../controllers/signup.js';
const router = express.Router();

router.post('/signup', signupControl);

export default router;