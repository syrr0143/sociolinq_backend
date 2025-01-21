import { z } from "zod";

export const jobSchema = z
  .object({
    jobId: z.string().length(7, "JobId must be exactly 7 characters"),
    title: z.string().min(1, "Job title is required"),
    employmentType: z.enum([
      "Full-time",
      "Part-time",
      "Contract",
      "Internship",
    ]),
    department: z.enum([
      "Engineering",
      "Marketing",
      "HR",
      "Finance",
      "Sales",
      "Operations",
    ]),
    grade: z.enum([
      "Junior",
      "Mid-level",
      "Senior",
      "Lead",
      "Manager",
      "Director",
    ]),
    role: z.enum([
      "Software Engineer",
      "HR Specialist",
      "Marketing Manager",
      "Product Manager",
      "Sales Executive",
    ]),
    classScope: z.enum([
      "Entry Level",
      "Mid-Level",
      "Experienced",
      "Executive",
    ]),
    workLocation: z.enum(["Remote", "On-site", "Hybrid"]),

    openPositions: z.preprocess(
      (val) => parseInt(val, 10),
      z.number().min(1, "At least one position is required")
    ),

    // Candidate-specific requirements
    medium: z.enum(["English", "Hindi", "Bilingual", "Others"]),
    boardOfEducation: z.enum([
      "CBSE",
      "ICSE",
      "State Board",
      "International",
      "Other",
    ]),
    subjectTaught: z.preprocess(
      (val) => (typeof val === "string" ? val.split(",") : val),
      z.array(z.string()).min(1, "At least one subject must be taught")
    ),
    category: z.enum(["General", "OBC", "SC", "ST", "EWS"]),

    // Age validation
    minAge: z.preprocess(
      (val) => parseInt(val, 10),
      z.number().min(18, "Minimum age should be at least 18")
    ),
    maxAge: z.preprocess(
      (val) => parseInt(val, 10),
      z.number().min(18, "Maximum age should be at least 18")
    ),

    // Experience validation
    minExperience: z.preprocess(
      (val) => parseInt(val, 10),
      z.number().min(0, "Experience should be a positive number")
    ),
    maxExperience: z.preprocess(
      (val) => parseInt(val, 10),
      z.number().min(0, "Experience should be a positive number")
    ),

    degree: z.enum(["B.Tech", "M.Tech", "B.Sc", "M.Sc", "MBA", "PhD", "Other"]),
    specialization: z.string().min(1, "Specialization is required"),
    university: z.string().min(1, "University is required"),
    marksRequired: z.preprocess(
      (val) => parseInt(val, 10),
      z.number().min(0, "Marks required should be a positive number")
    ),
    jobDescriptionAttached: z.string().url().optional(),
    comment: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.minAge != null && data.maxAge != null) {
        return data.maxAge >= data.minAge;
      }
      return true;
    },
    {
      message: "Maximum age must be greater than or equal to minimum age",
      path: ["maxAge"],
    }
  )
  .refine(
    (data) => {
      if (data.minExperience != null && data.maxExperience != null) {
        return data.maxExperience >= data.minExperience;
      }
      return true;
    },
    {
      message:
        "Maximum experience must be greater than or equal to minimum experience",
      path: ["maxExperience"],
    }
  );

export const employmentTypeValidator = z.object({
  employmentType: z.enum(["Full-time", "Part-time", "Contract", "Internship"], {
    errorMap: () => ({
      message:
        "Employment type must be one of 'Full-time', 'Part-time', 'Contract', or 'Internship'.",
    }),
  }),
});
