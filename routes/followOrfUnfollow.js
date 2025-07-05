import express from "express";
import authenticated from "../authentication/authenticated.js";
import { followUser, unfollowUser } from "../controllers/followControl.js";

const router = express.Router();

router.put("/follow/:id", authenticated, followUser);
router.put("/unfollow/:id", authenticated, unfollowUser);

export default router;
