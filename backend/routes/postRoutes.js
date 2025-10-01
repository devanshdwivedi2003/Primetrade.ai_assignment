import express from "express";
import Post from "../models/Post.js";
import authMiddleware from "../middleware/authmiddleware.js";

const router = express.Router();

// Create Post
router.post("/", authMiddleware, async (req, res) => {
  const post = await Post.create({ ...req.body, user: req.user });
  res.json(post);
});

// Get All Posts
router.get("/", async (req, res) => {
  const posts = await Post.find().populate("user", "name email");
  res.json(posts);
});

// Get Single Post
router.get("/:id", async (req, res) => {
  const post = await Post.findById(req.params.id).populate(
    "user",
    "name email"
  );
  res.json(post);
});

// Update Post
router.put("/:id", authMiddleware, async (req, res) => {
  const post = await Post.findOneAndUpdate(
    { _id: req.params.id, user: req.user },
    req.body,
    { new: true }
  );
  if (!post)
    return res.status(404).json({ msg: "Post not found or not authorized" });
  res.json(post);
});

// Delete Post
router.delete("/:id", authMiddleware, async (req, res) => {
  const post = await Post.findOneAndDelete({
    _id: req.params.id,
    user: req.user,
  });
  if (!post)
    return res.status(404).json({ msg: "Post not found or not authorized" });
  res.json({ msg: "Post deleted" });
});

export default router;
