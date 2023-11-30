import { Router } from "express";
import { protect } from "../middlewares/authMiddleware.js";
import {
  deleteItem,
  getItems,
  getLastItems,
} from "../controllers/itemController.js";

const router = Router();

router.route("/").get(getItems);
router.get("/last", getLastItems);
router.delete("/:id", protect, deleteItem);

export default router;
