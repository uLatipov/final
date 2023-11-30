import { Router } from "express";
import { protect, admin } from "../middlewares/authMiddleware.js";
import {
  login,
  logout,
  register,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  getUserProfile,
  updateUserProfile,
} from "../controllers/userController.js";

const router = Router();

router.route("/").post(register).get(protect, admin, getUsers);
router.post("/login", login);
router.post("/logout", protect, logout);
router
  .route("/my")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router
  .route("/:id")
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser)
  .delete(protect, admin, deleteUser);

export default router;
