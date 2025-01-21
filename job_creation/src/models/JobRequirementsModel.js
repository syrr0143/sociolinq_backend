import mongoose from "mongoose";
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

const jobSchema = new mongoose.Schema(
  {
    jobId: {
      type: String,
      required: true,
      unique: true,
    },
    schoolConfigId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SchoolConfig",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    employmentType: {
      type: String,
      enum: EMPLOYMENT_TYPES,
      required: true,
    },
    department: {
      type: String,
      enum: DEPARTMENTS,
      required: true,
    },
    grade: {
      type: String,
      enum: GRADES,
      required: true,
    },
    role: {
      type: String,
      enum: ROLES,
      required: true,
    },
    classScope: [
      {
        type: String,
        enum: CLASS_SCOPES,
        required: true,
      },
    ],
    workLocation: {
      type: String,
      required: true,
    },
    openPositions: {
      type: Number,
      required: true,
      min: 1,
    },
    medium: [
      {
        type: String,
        enum: MEDIUMS,
        required: true,
      },
    ],
    otherMedium: String,
    boardOfEducation: [
      {
        type: String,
        enum: BOARDS,
        required: true,
      },
    ],
    otherBoard: String,
    subjectsTaught: [
      {
        type: String,
        enum: SUBJECTS,
        required: true,
      },
    ],
    category: [
      {
        type: String,
        enum: CATEGORIES,
        required: true,
      },
    ],
    otherCategory: String,
    ageRequirement: {
      min: { type: Number },
      max: { type: Number },
    },
    experienceRequirement: {
      min: { type: Number, required: true },
      max: { type: Number },
    },
    qualificationRequirements: [
      {
        degree: {
          type: String,
          required: true,
        },
        otherDegree: String,
        specialization: String,
        otherSpecialization: String,
        university: String,
        otherUniversity: String,
        minMarks: Number,
      },
    ],
    jobDescription: {
      content: String,
      attachmentUrl: String,
    },
    status: {
      type: String,
      enum: JOB_STATUS,
      default: "OPEN",
    },
    additionalComments: String,
  },
  {
    timestamps: true,
  }
);

jobSchema.index({ schoolConfigId: 1 });
jobSchema.index({ status: 1 });
jobSchema.index({ department: 1, role: 1 });

const Job = mongoose.model("Job", jobSchema);
export default Job;
