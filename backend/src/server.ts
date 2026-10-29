import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { CONFIG } from "./config/constants.js";
import apiRouter from "./routes/index.js";
import { errorHandler } from "./middlewares/errorHandler.js";

dotenv.config();

const app = express();

// Middlewares
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check
app.get("/health", (req, res) => {
  res.json({
    status: "healthy",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    service: "Zyncoo AI Backend Server",
  });
});

// API Routes
app.use("/api", apiRouter);

// Global Error Handler
app.use(errorHandler);

const PORT = CONFIG.PORT;
app.listen(PORT, () => {
  console.log(`🚀 [Zyncoo AI Backend] Server running on http://localhost:${PORT}`);
  console.log(`📡 [Health Check] http://localhost:${PORT}/health`);
  console.log(`🤖 [AI Endpoint]  http://localhost:${PORT}/api/ai/chat`);
  console.log(`🚚 [Courier Endpoints] http://localhost:${PORT}/api/courier`);
  console.log(`💳 [bKash Endpoints]   http://localhost:${PORT}/api/payment/bkash-create`);
});

export default app;
