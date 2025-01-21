import express from "express";
import multer from "multer";
import JobController from "../controllers/JobController.js";
import {
  jobSchema,
  employmentTypeValidator,
} from "../validators/JobValidator.js"; // Import Zod schema
import { validate } from "../validators/validate.js"; // Import validation middleware

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post(
  "/job",
  upload.single("file"),
  validate(jobSchema),
  JobController.createJob
);
router.post(
  "/jobId",
  validate(employmentTypeValidator),
  JobController.createNewJobId
);

export default router;
