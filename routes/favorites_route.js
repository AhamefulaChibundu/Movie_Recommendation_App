import express from 'express';
import {addToFavorites, removeFromFavorites} from '../controllers/favorites.js';
import authenticated from '../authentication/authenticated.js';

const router = express.Router();

router.post('/favorites', authenticated, addToFavorites);
// Remove from favorites
router.delete('/favorites/:tmdbId', authenticated, removeFromFavorites);

export default router;