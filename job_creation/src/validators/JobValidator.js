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

const capitalizeString = (val) => {
  return val.charAt(0).toUpperCase() + val.slice(1).toLowerCase();
};

export const jobCreationSchema = z.object({
  jobId: z.string().min(1, "Job ID is required").max(255, "Job ID is too long"),
  schoolId: z.string().min(1, "School Config ID is required"),
  employmentType: z
    .string()
    .transform(capitalizeString)
    .refine((val) => EMPLOYMENT_TYPES.includes(val), {
      message: `Employment type must be one of: ${EMPLOYMENT_TYPES.join(", ")}`,
    }),
  department: z
    .string()
    .transform(capitalizeString)
    .refine((val) => DEPARTMENTS.includes(val), {
      message: `Department must be one of: ${DEPARTMENTS.join(", ")}`,
    }),
  grade: z
    .string()
    .transform(capitalizeString)
    .refine((val) => GRADES.includes(val), "Invalid grade"),
  role: z
    .string()
    .transform(capitalizeString)
    .refine((val) => ROLES.includes(val), "Invalid role"),
  classScope: z
    .array(z.string())
    .transform((arr) => arr.map(capitalizeString))
    .refine((scopes) => scopes.every((scope) => CLASS_SCOPES.includes(scope)), {
      message: `Class scope must be one of: ${CLASS_SCOPES.join(", ")}`,
    }),
  workLocation: z
    .string()
    .min(1, "Work location is required")
    .transform(capitalizeString),
  openPositions: z.number().min(1, "Open positions must be at least 1"),
  medium: z
    .array(z.string().transform(capitalizeString))
    .refine(
      (mediums) => mediums.every((medium) => MEDIUMS.includes(medium)),
      "Invalid medium"
    ),
  otherMedium: z.string().nullable().optional(),
  boardOfEducation: z
    .array(z.string())
    .refine(
      (boards) => boards.every((board) => BOARDS.includes(board)),
      "Invalid board of education"
    ),
  otherBoard: z.string().nullable().optional(),
  subjectsTaught: z
    .array(z.string().transform(capitalizeString))
    .refine(
      (subjects) => subjects.every((subject) => SUBJECTS.includes(subject)),
      "Invalid subject"
    ),
  category: z
    .array(z.string().transform(capitalizeString))
    .refine(
      (categories) =>
        categories.every((category) => CATEGORIES.includes(category)),
      "Invalid category"
    ),
  otherCategory: z.string().nullable().optional(),
  ageRequirement: z
    .object({
      min: z.number().nullable().optional(),
      max: z.number().nullable().optional(),
    })
    .optional()
    .superRefine((data, ctx) => {
      if (data?.min != null && data?.max != null && data.min > data.max) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Max age must not be less than Min age",
        });
      }
    }),
  experienceRequirement: z
    .object({
      min: z.number().min(0, "Min experience must be at least 0"),
      max: z.number().nullable().optional(),
    })
    .superRefine((data, ctx) => {
      if (data?.min != null && data?.max != null && data.min > data.max) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Max experience must not be less than Min experience",
        });
      }
    }),
  qualificationRequirements: z
    .array(
      z.object({
        degree: z.string().min(1, "Degree is required"),
        otherDegree: z.string().nullable().optional(),
        specialization: z.string().nullable().optional(),
        otherSpecialization: z.string().nullable().optional(),
        university: z.string().nullable().optional(),
        otherUniversity: z.string().nullable().optional(),
        minMarks: z.number().nullable().optional(),
      })
    )
    .optional(),
  jobDescription: z
    .object({
      content: z.string().optional(),
      attachmentUrl: z.string().url("Invalid URL").optional(),
    })
    .optional(),
  status: z
    .string()
    .transform(capitalizeString)
    .refine((val) => JOB_STATUS.includes(val), "Invalid status")
    .optional()
    .default("OPEN"),
  additionalComments: z.string().optional(),
});

export const employmentTypeValidator = z.object({
  employmentType: z
    .string()
    .transform(capitalizeString)
    .refine((val) => ["Full-Time", "Contract", "Internship"].includes(val), {
      message:
        "Employment type must be one of 'Full-Time', 'Contract', 'Internship'.",
    }),
});
