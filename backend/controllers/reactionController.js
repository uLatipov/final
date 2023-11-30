import Reaction from "../models/reactionModel.js";
import asyncHandler from "../utils/asyncHandler.js";

// @desc   Get comments
// @route  GET /api/reactions
// @access Public
const getReactions = asyncHandler(async (req, res) => {
  res.send("get reactions");
});

export { getReactions };
