import express from "express";
import authenticated from '../authentication/authenticated.js';
import { getAllUsers, getUserProfile } from "../controllers/userControl.js";

const router = express.Router();
router.get("/all", authenticated, getAllUsers);
router.get("/:id", authenticated, getUserProfile);

export default router;
