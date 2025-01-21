import { z } from "zod";
import {
  EMPLOYMENT_TYPES,
  DEPARTMENTS,
  GRADES,
  ROLES,
  CLASS_SCOPES,
  MEDIUMS,
  BOARDS,
  SUBJECTS,
  CATEGORIES,
  JOB_STATUS,
} from "../constants/enum.js";

// Define the Zod schema for job creation validation
export const jobCreationSchema = z.object({
  jobId: z.string().min(1, "Job ID is required").max(255, "Job ID is too long"),
  schoolConfigId: z.string().min(1, "School Config ID is required"),
  title: z
    .string()
    .min(1, "Job title is required")
    .max(255, "Job title is too long"),
  employmentType: z.enum(EMPLOYMENT_TYPES, "Invalid employment type"),
  department: z.enum(DEPARTMENTS, "Invalid department"),
  grade: z.enum(GRADES, "Invalid grade"),
  role: z.enum(ROLES, "Invalid role"),
  classScope: z
    .array(z.enum(CLASS_SCOPES))
    .min(1, "At least one class scope is required"),
  workLocation: z.string().min(1, "Work location is required"),
  openPositions: z.number().min(1, "Open positions must be at least 1"),
  medium: z.array(z.enum(MEDIUMS)).min(1, "At least one medium is required"),
  otherMedium: z.string().optional(),
  boardOfEducation: z
    .array(z.enum(BOARDS))
    .min(1, "At least one board of education is required"),
  otherBoard: z.string().optional(),
  subjectsTaught: z
    .array(z.enum(SUBJECTS))
    .min(1, "At least one subject is required"),
  category: z
    .array(z.enum(CATEGORIES))
    .min(1, "At least one category is required"),
  otherCategory: z.string().optional(),
  ageRequirement: z
    .object({
      min: z.number().optional(),
      max: z
        .number()
        .optional()
        .refine((value, ctx) => {
          if (ctx.parent.min && value && ctx.parent.min > value) {
            return false;
          }
          return true;
        }, "Max age must not be less than Min age"),
    })
    .optional(),
  experienceRequirement: z
    .object({
      min: z.number().min(0, "Min experience must be at least 0"),
      max: z
        .number()
        .optional()
        .refine((value, ctx) => {
          if (ctx.parent.min && value && ctx.parent.min > value) {
            return false;
          }
          return true;
        }, "Max experience must not be less than Min experience"),
    })
    .required(),
  qualificationRequirements: z
    .array(
      z.object({
        degree: z.string().min(1, "Degree is required"),
        otherDegree: z.string().optional(),
        specialization: z.string().optional(),
        otherSpecialization: z.string().optional(),
        university: z.string().optional(),
        otherUniversity: z.string().optional(),
        minMarks: z.number().optional(),
      })
    )
    .optional(),
  jobDescription: z
    .object({
      content: z.string().optional(),
      attachmentUrl: z.string().url("Invalid URL").optional(),
    })
    .optional(),
  status: z.enum(JOB_STATUS).optional().default("DRAFT"),
  additionalComments: z.string().optional(),
});

export const employmentTypeValidator = z.object({
  employmentType: z.enum(["Full-time", "Contract", "Internship"], {
    errorMap: () => ({
      message:
        "Employment type must be one of 'Full-time', 'Part-time', 'Contract', or 'Internship'.",
    }),
  }),
});
