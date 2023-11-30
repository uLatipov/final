import Item from "../models/itemModel.js";
import asyncHandler from "../utils/asyncHandler.js";

// @desc   Get items
// @route  GET /api/items
// @access Public
const getItems = asyncHandler(async (req, res) => {
  const items = await Item.find();

  res.json(items);
});

// @desc   Get last 10 items
// @route  GET /api/items
// @access Public
const getLastItems = asyncHandler(async (req, res) => {
  const items = await Item.find().sort({ createdAt: -1 }).limit(10).exec();

  res.json(items);
});

// @desc   Удалить айтем по идентификатору
// @route  DELETE /api/items/:id
// @access Public
const deleteItem = asyncHandler(async (req, res) => {
  const deletedItem = await Item.findByIdAndDelete(req.params.id);
  if (deletedItem) {
    res.json({ message: "Item deleted" });
  } else {
    res.status(404);
    throw new Error("Item not found");
  }
});

export { getItems, getLastItems, deleteItem };
