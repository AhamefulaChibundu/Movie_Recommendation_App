import express from "express";
import authenticated from "../authentication/authenticated.js";
import { addOrUpdateReview, deleteReview, getReviewsForMovie } from "../controllers/reviewControl.js";

const router = express.Router();

// add or update review
router.post("/reviews", authenticated, addOrUpdateReview);
// delete review
router.delete("/reviews/:tmdbId", authenticated, deleteReview);
// get all reviews for a movie
router.get("/reviews/:tmdbId", getReviewsForMovie);

export default router;
