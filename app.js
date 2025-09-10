import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

// Initialize app
const app = express();

// Middleware
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());

// Routes import
import userRouter from './src/routes/user.js';
import noteRouter from "./src/routes/note.js";

// Routes declaration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/note", noteRouter);

// Export default server instance
export default app;
