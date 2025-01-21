import express from "express";
import dotenv from "dotenv";
import logger from "./utils/logger.js";
import { roleRoutes } from "./routes/index.js";
import { connectDb } from "./config/db.js";
import { errorHandler } from "./utils/errorHandler.js";

dotenv.config();
connectDb();

const app = express();

app.use(express.json());

// Logger middleware
app.use((req, res, next) => {
  logger.info(`[${req.method}] ${req.url} - Body: ${JSON.stringify(req.body)}`);
  next();
});

// Health check endpoint
app.get("/", (req, res) => {
  res.send("Access Management Service is running");
  logger.info("Health check endpoint hit");
});

// user roles related routes
app.use("/role", roleRoutes);

// Catch-all for undefined routes
app.all("*", (req, res, next) => {
  const error = new Error("Route not found");
  error.statusCode = 404;
  logger.warn(`Undefined route accessed: ${req.method} ${req.url}`);
  next(error);
});

// Error handler
app.use(errorHandler);

export default app;
