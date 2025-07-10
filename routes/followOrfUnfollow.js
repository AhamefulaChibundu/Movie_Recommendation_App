import express from "express";
import authenticated from "../authentication/authenticated.js";
import { followUser, unfollowUser } from "../controllers/followControl.js";

const router = express.Router();

router.put("/users/follow/:id", authenticated, followUser);
router.put("/users/unfollow/:id", authenticated, unfollowUser);

export default router;
