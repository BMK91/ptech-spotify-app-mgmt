const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const { generateAccessToken } = require("../config/jwt");
const User = require("../models/UserModel");

// Register User
const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Create a new user
    const newUser = new User({ name, email, password });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Login User
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Create JWT token
    // const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    //   expiresIn: "1h",
    // });
    const token = generateAccessToken({ userId: user._id });

    res.json({ token, name: user.name });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { register, login };
