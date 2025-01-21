import JobService from "../services/JobService.js";
import { uploadToCloudinary } from "../utils/FileUpload.js";
import { CustomError, apiResponse } from "../utils/customResponse.js";
import jobUtils from "../utils/jobUtils.js";

class JobController {
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
  async createJob(req, res) {
    try {
      const jobData = req.body;
      let jobDescriptionUrl = null;

      if (req.file) {
        const uploadResult = await uploadToCloudinary(req.file);
        jobDescriptionUrl = uploadResult.secure_url;
      }
      jobData.jobDescriptionAttached = jobDescriptionUrl;
      const newJobId = await jobUtils.getJobId(jobData.employmentType);
      jobData.jobId = newJobId;
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
  async getAllJob(req, res) {
    try {
      const job = await JobService.getAllJob();
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
  async getOpenJobs(req, res) {
    try {
      const filters = req.body;
      const jobs = await JobService.getOpenJobs(filters);

      if (jobs.length === 0) {
        return apiResponse.success(res, "No job found", jobs);
      }
      return apiResponse.success(res, "Open jobs fetched successfully", {
        totalJobs: jobs.length,
        jobs: jobs,
      });
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
