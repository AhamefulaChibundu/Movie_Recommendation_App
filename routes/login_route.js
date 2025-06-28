import express from 'express';
import loginControl from '../controllers/login.js';
const router = express.Router();

router.post("/login", loginControl);

export default router;