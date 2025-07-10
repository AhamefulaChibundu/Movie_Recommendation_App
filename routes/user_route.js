import express from "express";
import authenticated from '../authentication/authenticated.js';
import { getAllUsers, getUserProfile } from "../controllers/userControl.js";

const router = express.Router();
router.get("/all", authenticated, getAllUsers);
router.get("/:id([a-fA-F0-9]{24})", authenticated, getUserProfile);

export default router;
