// server.js (Vercel-compatible)
import dotenv from "dotenv";
import connectDB from "./src/db/connection.js";
import { app } from "./app.js";
import { createServer } from "http";

dotenv.config({
  path: "./.env"
});

// Connect to MongoDB once when serverless function cold starts
let isDBConnected = false;
const connectToDB = async () => {
  if (!isDBConnected) {
    try {
      await connectDB();
      isDBConnected = true;
      console.log("MongoDB connected!");
    } catch (err) {
      console.error("MongoDB connection failed:", err);
      throw err;
    }
  }
};

// Export Vercel serverless function
export default async function handler(req, res) {
  try {
    await connectToDB(); // ensure DB is connected
    const server = createServer(app);
    server.emit("request", req, res);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error", details: err.message });
  }
}
