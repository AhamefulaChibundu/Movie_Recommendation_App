import express from 'express';
import deleteAccount from '../controllers/delete_account.js';
import authenticated from '../authentication/authenticated.js';

const router = express.Router();

router.delete('/delete', authenticated, deleteAccount);

export default router;