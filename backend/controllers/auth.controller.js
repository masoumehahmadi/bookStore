const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const dotenv = require("dotenv");
dotenv.config();
// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public

exports.registerUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  try {
    // Basic Validation
    if (!username || !password || password.length < 8) {
      res.status(400).json({
        message:
          "Please provide username and a password with at least 8 characters",
      });
      return;
    }

    // Check if the user exists
    let existingUser = await User.findOne({ username });

    if (existingUser) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    // Create user
    const user = await User.create({
      username,
      password: password, // Ensure password is set correctly
    });

    res.status(201).json({
      _id: user.id,
      username: user.username,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res
      .status(400)
      .json({ message: "Invalid user data", error: error.message });
    return;
  }
});

// @desc    Authenticate user (login)
// @route   POST /api/auth/login
// @access  Public

exports.loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  try {
    // Basic Validation
    if (!username || !password) {
      res.status(400).json({ message: "Please provide username and password" });
      return;
    }

    const user = await User.findOne({ username });

    // Check if user exists
    if (!user) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    // Check if password is correct
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      res
        .status(401)
        .json({ message: "Invalid credentials: Password incorrect" });
      return;
    }

    // Login successful, send token
    res.status(200).json({
      _id: user.id,
      username: user.username,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
    return;
  }
});

// @desc    Get current user data
// @route   GET /api/auth/me
// @access  Private (Protected by auth middleware)
exports.getMe = asyncHandler(async (req, res) => {
  try {
    // req.user will have the user data from the auth middleware
    const user = await User.findById(req.user.id).select("-password"); // Exclude password

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: "Invalid user data" });
    return;
  }
});

// Token generation helper function
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || secretkey, {
    expiresIn: "30d",
  });
};
