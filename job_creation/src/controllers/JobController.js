import JobService from "../services/JobService.js";
import { uploadToCloudinary } from "../utils/FileUpload.js";
import { CustomError, apiResponse } from "../utils/customResponse.js";
import jobUtils from "../utils/jobUtils.js";

class JobController {
  async createJob(req, res) {
    try {
      const jobData = req.body;
      let jobDescriptionUrl = null;

      if (req.file) {
        const uploadResult = await uploadToCloudinary(req.file);
        jobDescriptionUrl = uploadResult.secure_url;
      }
      jobData.jobDescriptionAttached = jobDescriptionUrl;
      
      const newJob = await JobService.createJob(jobData);
      apiResponse.success(res, "Job created successfully", newJob);
    } catch (error) {
      if (error instanceof CustomError) {
        apiResponse.error(res, error.message, error.statusCode);
      } else {
        apiResponse.error(res, "Internal Server Error", 500, error.message);
      }
    }
  }
  async getJob(req, res) {
    try {
      const jobId = req.params.id;
      const job = await JobService.getJob(jobId);
      if (!job) {
        throw new CustomError("Job not found", 404);
      }
      apiResponse.success(res, "Job retrieved successfully", job);
    } catch (error) {
      if (error instanceof CustomError) {
        apiResponse.error(res, error.message, error.statusCode);
      } else {
        apiResponse.error(res, "Internal Server Error", 500, error.message);
      }
    }
  }
  async createNewJobId(req, res) {
    try {
      const { employmentType } = req.body;
      const newJobId = await jobUtils.getJobId(employmentType);
      if (!newJobId) {
        throw new CustomError("no newJobId found ", 404);
      }
      apiResponse.success(res, "newJobId retrieved successfully", newJobId);
    } catch (error) {
      if (error instanceof CustomError) {
        apiResponse.error(res, error.message, error.statusCode);
      } else {
        apiResponse.error(res, "Internal Server Error", 500, error.message);
      }
    }
  }
}

export default new JobController();
