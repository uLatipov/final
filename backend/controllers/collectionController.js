import Collection from "../models/collectionModel.js";
import Item from "../models/itemModel.js";
import User from "../models/userModel.js";
import asyncHandler from "../utils/asyncHandler.js";

// @desc   Get collections
// @route  GET /api/collections
// @access Public
const getCollections = asyncHandler(async (req, res) => {
  const collections = await Collection.find();

  res.json(collections);
});

// @desc   Get top 5 biggest collections
// @route  GET /api/collections/top
// @access Public
const getTopCollections = asyncHandler(async (req, res) => {
  const topCollections = await Collection.aggregate([
    {
      $lookup: {
        from: "items",
        localField: "_id",
        foreignField: "collectionId",
        as: "items",
      },
    },

    {
      $sort: { itemCount: -1 },
    },
    {
      $limit: 5,
    },
  ]);

  res.json(topCollections);
});

// @desc   Add Collection
// @route  POST /api/collections
// @access Private
const addCollection = asyncHandler(async (req, res) => {
  try {
    const { description, theme, itemFields, title, image } = req.body;
    const newCollection = new Collection({
      description,
      theme,
      itemFields,
      title,
      image,
      userId: req.user._id,
    });

    await newCollection.save();

    const user = await User.aggregate([
      { $match: { _id: req.user._id } },
      {
        $lookup: {
          from: "collections",
          localField: "_id",
          foreignField: "userId",
          as: "collections",
        },
      },
      {
        $lookup: {
          from: "items",
          localField: "_id",
          foreignField: "userId",
          as: "items",
        },
      },
    ]);

    res.json(user[0]);
  } catch (err) {
    res.status(400);
    throw new Error(err.message);
  }
});

// @desc   Delete collection
// @route  DELETE /api/collections/:id
// @access Private
const deleteCollection = asyncHandler(async (req, res) => {
  const deletedCollection = await Collection.findByIdAndDelete(req.params.id);
  if (deletedCollection) {
    res.json({ message: "Collection deleted" });
  } else {
    res.status(404);
    throw new Error("Collection not found");
  }
});

// @desc   Добавить айтем
// @route  POST /api/items
// @access Private
const addItemToCollection = asyncHandler(async (req, res) => {
  const collection = await Collection.findById(req.params.id);
  if (collection) {
    const { name, description } = req.body;
    const newItem = new Item({
      name,
      description,
      collectionId: req.params.id,
      userId: collection.userId,
    });
    const savedItem = await newItem.save();
    res.json(savedItem);
  } else {
    res.status(404);
    throw new Error("No such collection");
  }
});

// @desc   Get collection by Id
// @route  Get /api/collections/:id
// @access Public
const getCollectionById = asyncHandler(async (req, res) => {
  const collections = await Collection.findById(req.params.id).populate(
    "userId"
  );
  const items = await Item.find({ collectionId: collections._id });

  if (collections) {
    res.json({ collections, items });
  } else {
    res.status(404);
    throw new Error("No such collection");
  }
});

export {
  getCollections,
  getTopCollections,
  addCollection,
  deleteCollection,
  addItemToCollection,
  getCollectionById,
};
