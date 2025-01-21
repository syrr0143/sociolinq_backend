import Job from "../models/JobRequirementsModel.js";
import { CustomError } from "../utils/customResponse.js";

class JobService {
  async createJob(jobData) {
    try {
      console.log("job data", jobData);
      const newJob = new Job(jobData);
      await newJob.save();
      return newJob;
    } catch (error) {
      console.log("error ", error);
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
      const job = await Job.findOne();
      return job;
    } catch (error) {
      throw new CustomError("Error retrieving job", 500);
    }
  }

  async getLastJobId() {
    try {
      const lastJob = await Job.findOne().sort({ createdAt: -1 }).exec();
      console.log("last job found in service is ", lastJob);
      if (lastJob) {
        return lastJob.jobId;
      }
      console.log("not found ", lastJob);
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
}

export default new JobService();
