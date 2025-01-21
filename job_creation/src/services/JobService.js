import Job from "../models/JobRequirementsModel.js";
import { CustomError } from "../utils/customResponse.js";
import { jobCreationSchema } from "../validators/JobValidator.js";
import { validate } from "../validators/validate.js";

class JobService {
  async createJob(jobData) {
    try {
      validate(jobCreationSchema);
      const newJob = new Job(jobData);
      await newJob.save();
      return newJob;
    } catch (error) {
      throw new CustomError("Error creating job", 500);
    }
  }

  async getJob(jobId) {
    try {
      const job = await Job.findById(jobId);
      return job;
    } catch (error) {
      throw new CustomError("Error retrieving job", 500);
    }
  }
  async getAllJob() {
    try {
      const job = await Job.find();
      return job;
    } catch (error) {
      throw new CustomError("Error retrieving job", 500);
    }
  }

  async getLastJobId() {
    try {
      const lastJob = await Job.findOne().sort({ createdAt: -1 }).exec();
      if (lastJob) {
        return lastJob.jobId;
      }

      return "00000000"; // Return a base job ID if no jobs are found
    } catch (error) {
      throw new CustomError("Error retrieving last JobId", 500);
    }
  }

  // Check if jobId exists in the database
  async isJobIdExists(jobId) {
    try {
      const job = await Job.findOne({ jobId }).exec();
      return job != null; // Return true if the jobId exists
    } catch (error) {
      throw new CustomError("Error checking job ID existence", 500);
    }
  }
  async getOpenJobs(filters) {
    const { employmentType, department, grade } = filters;
    const query = {
      status: "OPEN",
      ...(employmentType &&
        employmentType.length > 0 && {
          employmentType: { $in: employmentType },
        }),
      ...(department &&
        department.length > 0 && { department: { $in: department } }),
      ...(grade && grade.length > 0 && { grade: { $in: grade } }),
    };

    try {
      // Fetch jobs from the database
      const jobs = await Job.find(query);
      return jobs;
    } catch (error) {
      console.error("Error in getOpenJobsService:", error);
      throw new CustomError("Failed to fetch jobs", 500);
    }
  }
}

export default new JobService();
