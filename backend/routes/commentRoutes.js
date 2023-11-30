import { Router } from "express";
import { protect, commentPrivate } from "../middlewares/authMiddleware.js";
import {
  getComments,
  addComment,
  editComment,
  deleteComment,
} from "../controllers/commentController.js";

const router = Router();

router.route("/").get(getComments).post(protect, addComment);
router
  .route("/:id")
  .put(protect, commentPrivate, editComment)
  .delete(protect, commentPrivate, deleteComment);

export default router;
