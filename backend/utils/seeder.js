import { config } from "dotenv";
import posts from "../data/posts.js";
import users from "../data/users.js";

import Post from "../models/postModel.js";
import User from "../models/userModel.js";
import Reaction from "../models/reactionModels.js";
import dbConnect from "./dbConnect.js";
import { hashPassword } from "./password.js";

config();
dbConnect();

const importData = async () => {
  try {
    await Post.deleteMany();
    await Reaction.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;

    const samplePosts = posts.map((e) => {
      return { ...e, user: adminUser };
    });

    await Post.insertMany(samplePosts);

    console.log("Data imported");
    process.exit();
  } catch (e) {
    console.error(`${e}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Post.deleteMany();
    await Reaction.deleteMany();
    await User.deleteMany();

    console.log("Data destroyed");
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
