import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import authRoutes from "./routes/authRoutes.js";
import postRoutes from "./routes/postRoutes.js";

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());

// Rate limiter (100 requests per 15 mins)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(limiter);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT || 5000, () =>
      console.log(`✅ Server running on port ${process.env.PORT || 5000}`)
    );
  })
  .catch((err) => console.error("MongoDB connection error:", err));
