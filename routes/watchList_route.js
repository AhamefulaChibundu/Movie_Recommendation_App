import express from 'express';
import authenticated from '../authentication/authenticated.js';
import { addToWatchlist, removeFromWatchlist, getWatchlist } from '../controllers/watchlist.js';

const router = express.Router();

router.post('/watchlist', authenticated, addToWatchlist);
// Remove from watchlist
router.delete('/watchlist/:tmdbId', authenticated, removeFromWatchlist);

router.get('/watchlist', authenticated, getWatchlist);

export default router;
