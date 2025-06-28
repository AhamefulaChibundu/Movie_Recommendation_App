import express from 'express';
import logout from '../controllers/logout.js';
import authenticated from '../authentication/authenticated.js';

const router = express.Router();

router.post('/logout', authenticated, logout);

export default router;