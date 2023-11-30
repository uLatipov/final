import User from "../models/userModel.js";
import asyncHandler from "../utils/asyncHandler.js";
import generateToken from "../utils/generateToken.js";
import { comparePassword, decodePassword } from "../utils/password.js";

// @desc   Login
// @route  POST /api/users/login
// @access Public
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await comparePassword(password, user.password))) {
    generateToken(res, user._id);

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error("invalid email or password");
  }
});

// @desc   Register
// @route  POST /api/users
// @access Public
const register = asyncHandler(async (req, res) => {
  const { name, email, password, isAdmin } = req.body;
  const userExists = await User.findOne({ email });
  console.log(req.body);

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
    isAdmin: Boolean(isAdmin),
  });

  if (user) {
    generateToken(res, user._id);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(400);
    throw new Error("Invalid User Data");
  }
});

// @desc   Logout user & clear cookie
// @route  POST /api/users/logout
// @access Private
const logout = asyncHandler(async (req, res) => {
  res.clearCookie("jwt");
  res.status(200).json({
    message: "Logged out successfully",
  });
});

// @desc   Get users
// @route  GET /api/users
// @access Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const posts = await User.find({});

  res.status(200).json(posts);
});

// @desc   Get user by ID
// @route  GET /api/users/:id
// @access Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc   Update user
// @route  PUT /api/users/:id
// @access Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = Boolean(req.user.isAdmin);

    // const exists = await User.findOne({ email: req.body.email });

    // if (
    //   exists &&
    //   exists.email === user.email &&
    //   exists.name &&
    //   (await comparePassword(
    //     req.body.password || (await decodePassword(user.password)),
    //     exists.password
    //   ))
    // ) {
    //   res.status(400);
    //   throw new Error("There is nothing to update");
    // } else if (exists) {
    //   res.status(409);
    //   throw new Error("User with this email already exists");
    // }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc   Delete user
// @route  DELETE /api/users/:id
// @access Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    if (user.isAdmin) {
      res.status(400);
      throw new Error("Can not delete admin user");
    }
    await User.deleteOne({ _id: user._id });
    res.json({ message: "User removed" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc   Get user profile
// @route  GET /api/users/my
// @access Private
const getUserProfile = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const user = await User.aggregate([
    { $match: { _id: userId } },
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

  if (user.length > 0) {
    res.json(user[0]);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc   Update user profile
// @route  PUT /api/users/my
// @access Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    // const exists = await User.findOne({ email: req.body.email });

    // if (exists) {
    //   res.status(409);
    //   throw new Error("User with this email already exists");
    // }

    const updatedUser = await user.save();

    generateToken(res, user._id);

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export {
  login,
  logout,
  register,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  getUserProfile,
  updateUserProfile,
};
