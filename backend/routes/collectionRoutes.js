import { Router } from "express";
import { protect } from "../middlewares/authMiddleware.js";
import {
  getCollections,
  getTopCollections,
  addCollection,
  deleteCollection,
  addItemToCollection,
  getCollectionById,
} from "../controllers/collectionController.js";

const router = Router();

router.route("/").get(getCollections).post(protect, addCollection);
router.get("/top", getTopCollections);
router
  .route("/:id")
  .get(getCollectionById)
  .delete(protect, deleteCollection)
  .post(protect, addItemToCollection);

export default router;
