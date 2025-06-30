import express from 'express';
import {addToFavorites, removeFromFavorites, getFavorites} from '../controllers/favorites.js';
import authenticated from '../authentication/authenticated.js';

const router = express.Router();

router.post('/favorites', authenticated, addToFavorites);
// Remove from favorites
router.delete('/favorites/:tmdbId', authenticated, removeFromFavorites);

router.get('/favorites', authenticated, getFavorites);

export default router;