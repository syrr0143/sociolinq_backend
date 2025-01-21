import http from "http";
import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./config/db.js";

dotenv.config();

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGODB_URI;
console.log("MONGO_URI", MONGO_URI);

connectDB(MONGO_URI);

const server = http.createServer(app);
server.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});

process.on("uncaughtException", (error) => {
  console.error("❗ Uncaught Exception:", error.message);
  process.exit(1);
});

process.on("unhandledRejection", (error) => {
  console.error("❗ Unhandled Rejection:", error.message);
  process.exit(1);
});
