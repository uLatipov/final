import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    item: { type: mongoose.Schema.Types.ObjectId, ref: "Item" },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    text: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

commentSchema.index({ text: "text" });

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
