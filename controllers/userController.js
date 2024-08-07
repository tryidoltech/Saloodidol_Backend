const User = require("../models/userModel");
const asyncHandler = require("../middlewares/asyncHandler");
const jwt = require("jsonwebtoken");
const {
  uploadOnCloudinary,
  deleteFromCloudinary,
} = require("../utils/cloudinary");

//============  register user  ==============//

const registerUser = asyncHandler(async (req, res) => {
  try {
    const { username, email, mobile, password } = req.body;

    // Validation
    // switch (true) {
    //   case !username:
    //     return res
    //       .status(400)
    //       .json({ success: false, message: "Username is required" });
    //   case !email:
    //     return res
    //       .status(400)
    //       .json({ success: false, message: "Email is required" });
    //   case !mobile:
    //     return res
    //       .status(400)
    //       .json({ success: false, message: "Mobile is required" });
    //   case !password:
    //     return res
    //       .status(400)
    //       .json({ success: false, message: "Password is required" });
    // }

    const existingEmail = await User.findOne({ email });
    const existingMobile = await User.findOne({ mobile });
    const existingUsername = await User.findOne({ username });

    if (existingEmail) {
      return res
        .status(400)
        .json({ success: false, message: "Email already in use." });
    }
    if (existingMobile) {
      return res
        .status(400)
        .json({ success: false, message: "Mobile already in use." });
    }
    if (existingUsername) {
      return res
        .status(400)
        .json({ success: false, message: "Username already in use." });
    }

    const user = await User.create({
      username: username,
      email: email,
      mobile: mobile,
      password: password,
    });

    return res.status(201).json({
      success: true,
      message: "User registered successfully.",
      user: user,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

//============  login user  =============//

const loginUser = asyncHandler(async (req, res) => {
  try {
    const { email, username, password } = req.body;

    if (!email && !username) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email or username.",
      });
    }
    if (!password) {
      return res.status(400).json({
        success: false,
        message: "Please provide password",
      });
    }

    const existingEmail = await User.findOne({ email });
    const existingUsername = await User.findOne({ username });
    let user = existingUsername ?? existingEmail;

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User does not exist" });
    }

    const isMatch = await user.verifyPassword(password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials." });
    }

    // Create and sign JWT token
    const token = jwt.sign(
      { id: user._id, userType: user.userType },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    user._doc.token = token;

    return res
      .status(200)
      .json({ success: true, message: "Login successfully.", user: user });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

//=========  User logout  =========//

const logout = asyncHandler(async (req, res) => {
  try {
    res.clearCookie("authorization");
    return res.status(200).json({
      success: true,
      message: "You have been successfully logged out.",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

//=========  Get all users  =========//

const getAllUsers = asyncHandler(async (req, res) => {
  try {
    let users = await User.find({ isAdmin: false });
    if (!users.length) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    return res.json({
      success: true,
      message: "User data fetched successfully.",
      users: users,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

//=========  Get user profile  ===========//

const getUserProfile = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById({ _id: req.params.userId });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found. Please check the provided user ID.",
      });
    }

    return res.json({
      success: true,
      message: "User profile retrieved successfully.",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = {
  registerUser,
  loginUser,
  logout,
  getAllUsers,
  getUserProfile,
};
