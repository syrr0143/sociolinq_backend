import express from "express";
import cors from "cors";
import jobRoute from "./routes/JobRoutes.js";
import fileRoute from "./routes/fileRoute.js";
import errorHandler from "./utils/errorHandler.js";
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", jobRoute);
app.use("/api", fileRoute);

app.get("/", (req, res) => {
  res.status(200).send("API is running...");
});

app.use(errorHandler);

export default app;
