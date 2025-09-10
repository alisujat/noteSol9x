// server.js (Vercel-compatible)
import dotenv from "dotenv";
import connectDB from "./src/db/connection.js";
import { app } from "./app.js";
import { createServer } from "http";

dotenv.config({
  path: "./.env"
});

let isDBConnected = false;

// Function to connect to MongoDB
async function connectToDB() {
  if (!isDBConnected) {
    await connectDB();
    isDBConnected = true;
  }
}

// Default export required by Vercel
export default async function handler(req, res) {
  try {
    await connectToDB(); // Ensure DB is connected
    const server = createServer(app);
    server.emit("request", req, res);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error", details: err.message });
  }
}
