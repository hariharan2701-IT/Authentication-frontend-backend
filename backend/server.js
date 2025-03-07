import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";

dotenv.config(); // Load environment variables at the beginning

const app = express();

// Middleware
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174"], // Allow multiple frontend origins
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Routes
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000; // Use PORT from .env or default to 5000

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
