import asyncHandler from "../utils/asyncHandler.js";

// @desc   Get comments
// @route  GET /api/comments
// @access Public
const getComments = asyncHandler(async (req, res) => {
  res.send("get comments");
});

// @desc   Add comment
// @route  POST /api/comments
// @access Private
const addComment = asyncHandler(async (req, res) => {
  res.send("add comment");
});

// @desc   Edit comment
// @route  PUT /api/comments/:id
// @access Private
const editComment = asyncHandler(async (req, res) => {
  res.send("edit comment");
});

// @desc   Delete comment
// @route  DELETE /api/comments/:id
// @access Private
const deleteComment = asyncHandler(async (req, res) => {
  res.send("delete comment");
});

export { getComments, addComment, editComment, deleteComment };
