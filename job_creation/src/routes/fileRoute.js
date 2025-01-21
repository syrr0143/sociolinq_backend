import express from "express";
import upload from "../config/multerConfig.js";
import { processDocument } from "../controllers/fileProcessingController.js";

const router = express.Router();

router.post("/process-document", upload.single("file"), processDocument);

export default router;
