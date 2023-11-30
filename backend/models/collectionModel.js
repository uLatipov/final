import mongoose from "mongoose";

const collectionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  theme: {
    type: String,
    required: true,
  },
  image: String,
  itemFields: {
    integerFields: [
      {
        name: String,
        value: Number,
      },
    ],
    stringFields: [
      {
        name: String,
        value: String,
      },
    ],
    textFields: [
      {
        name: String,
        value: String,
      },
    ],
    booleanFields: [
      {
        name: String,
        value: Boolean,
      },
    ],
    dateFields: [
      {
        name: String,
        value: Date,
      },
    ],
  },
});

collectionSchema.index({
  description: "text",
  title: "text",
  theme: "text",
  tags: 1,
});

const Collection = mongoose.model("Collection", collectionSchema);

export default Collection;
