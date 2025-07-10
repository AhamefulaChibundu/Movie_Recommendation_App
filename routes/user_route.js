import express from "express";
import authenticated from '../authentication/authenticated.js';
import { getAllUsers, getUserProfile } from "../controllers/userControl.js";

const router = express.Router();
router.get("/users/all", authenticated, getAllUsers);
router.get("/users/:id", authenticated, getUserProfile);

export default router;
