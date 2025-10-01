import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import authMiddleware from "../middleware/authmiddleware.js";

const router = express.Router();

// Generate JWT
const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });

// =====================
// Signup
// =====================
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password, avatar } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    user = await User.create({ name, email, password, avatar });
    const token = generateToken(user._id);

    res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar || "",
      },
    });
  } catch (err) {
    console.error("Signup error:", err.message);
    res.status(500).json({ msg: "Server error" });
  }
});

// =====================
// Login
// =====================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ msg: "Email and password required" });
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const token = generateToken(user._id);

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar || "",
      },
    });
  } catch (err) {
    console.error("Login error:", err.message);
    res.status(500).json({ msg: "Server error" });
  }
});

// =====================
// Get Profile
// =====================
router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user).select("-password");
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.json(user);
  } catch (err) {
    console.error("Profile fetch error:", err.message);
    res.status(500).json({ msg: "Server error" });
  }
});

// =====================
// Update Profile
// =====================
router.put("/profile", authMiddleware, async (req, res) => {
  try {
    const { name, email, avatar } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.user,
      { name, email, avatar },
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.json(updatedUser);
  } catch (err) {
    console.error("Profile update error:", err.message);
    res.status(500).json({ msg: "Failed to update profile" });
  }
});

export default router;
