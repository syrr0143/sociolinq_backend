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

export const jobCreationSchema = z.object({
  jobId: z.string().min(1, "Job ID is required").max(255, "Job ID is too long"),
  schoolConfigId: z.string().min(1, "School Config ID is required"),
  employmentType: z
    .string()
    .transform((val) => val.toUpperCase())
    .refine((val) => EMPLOYMENT_TYPES.includes(val), {
      message: `Employment type must be one of: ${EMPLOYMENT_TYPES.join(", ")}`,
    }),
  department: z
    .string()
    .transform((val) => val.toUpperCase())
    .refine((val) => DEPARTMENTS.includes(val), {
      message: `Department must be one of: ${DEPARTMENTS.join(", ")}`,
    }),
  grade: z
    .string()
    .transform((val) => val.toUpperCase())
    .refine((val) => GRADES.includes(val), "Invalid grade"),
  role: z
    .string()
    .transform((val) => val.toUpperCase())
    .refine((val) => ROLES.includes(val), "Invalid role"),
  classScope: z
    .array(z.string())
    .transform((arr) => arr.map((val) => val.toUpperCase()))
    .refine((scopes) => scopes.every((scope) => CLASS_SCOPES.includes(scope)), {
      message: `Class scope must be one of: ${CLASS_SCOPES.join(", ")}`,
    }),
  workLocation: z
    .string()
    .min(1, "Work location is required")
    .transform((val) => val.toUpperCase()),
  openPositions: z.number().min(1, "Open positions must be at least 1"),
  medium: z
    .array(z.string().transform((val) => val.toUpperCase()))
    .refine(
      (mediums) => mediums.every((medium) => MEDIUMS.includes(medium)),
      "Invalid medium"
    ),
  otherMedium: z.string().nullable().optional(),
  boardOfEducation: z
    .array(z.string().transform((val) => val.toUpperCase()))
    .refine(
      (boards) => boards.every((board) => BOARDS.includes(board)),
      "Invalid board of education"
    ),
  otherBoard: z.string().nullable().optional(),
  subjectsTaught: z
    .array(z.string().transform((val) => val.toUpperCase()))
    .refine(
      (subjects) => subjects.every((subject) => SUBJECTS.includes(subject)),
      "Invalid subject"
    ),
  category: z
    .array(z.string().transform((val) => val.toUpperCase()))
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
    .transform((val) => val.toUpperCase())
    .refine((val) => JOB_STATUS.includes(val), "Invalid status")
    .optional()
    .default("OPEN"),
  additionalComments: z.string().optional(),
});

export const employmentTypeValidator = z.object({
  employmentType: z
    .string()
    .transform((val) => val.toUpperCase())
    .refine((val) => ["FULL-TIME", "CONTRACT", "INTERNSHIP"].includes(val), {
      message:
        "Employment type must be one of 'FULL-TIME', 'CONTRACT', or 'INTERNSHIP'.",
    }),
});
