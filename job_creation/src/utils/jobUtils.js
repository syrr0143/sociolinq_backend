import JobService from "../services/JobService.js";
import { CustomError } from "./customResponse.js";

class JobUtils {
  async getJobId(employmentType) {
    try {
      const currentYear = new Date().getFullYear();
      let lastJobId = await JobService.getLastJobId();

      // Handle case where no previous job ID is found
      if (!lastJobId) {
        lastJobId = "00000000"; // Fallback to a base value if no job IDs exist
      }

      const lastSeq = parseInt(lastJobId.slice(-4), 10);
      let nextSeq = lastSeq + 1;
      let newJobId;

      // Check if the generated job ID already exists and regenerate if necessary
      do {
        newJobId = `${employmentType[0]}${currentYear
          .toString()
          .slice(-2)}${nextSeq.toString().padStart(4, "0")}`;
        nextSeq++;
      } while (await JobService.isJobIdExists(newJobId)); // Keep checking until jobId is unique

      return newJobId;
    } catch (error) {
      throw new CustomError(
        `Error generating the new Job ID: ${error.message}`,
        500
      );
    }
  }
}

export default new JobUtils();
