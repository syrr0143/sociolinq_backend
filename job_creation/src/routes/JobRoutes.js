import express from "express";
import multer from "multer";
import JobController from "../controllers/JobController.js";
import { employmentTypeValidator } from "../validators/JobValidator.js";
import { validate } from "../validators/validate.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/job", upload.single("file"), JobController.createJob);
router.post(
  "/job-id",
  validate(employmentTypeValidator),
  JobController.createNewJobId
);
router.get("/job", JobController.getAllJob);
router.post("/jobs/open", JobController.getOpenJobs);
export default router;
