import { Router } from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { getReactions } from "../controllers/reactionController.js";

const router = Router();

router.get("/", getReactions);

export default router;
