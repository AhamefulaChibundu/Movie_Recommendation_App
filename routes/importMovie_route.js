import express from 'express';
import importMovie from '../controllers/importMovie.js';

const router = express.Router();

router.get('/import-movie/:tmdbId', importMovie);

export default router;
