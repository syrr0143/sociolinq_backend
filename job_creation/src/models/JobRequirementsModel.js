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

const capitalizeFirstLetter = (val) => {
  return val.replace(/\b\w/g, (c) => c.toUpperCase());
};

const capitalizeArray = (arr) => {
  return arr.map((item) => capitalizeFirstLetter(item));
};

const jobSchema = new mongoose.Schema(
  {
    jobId: {
      type: String,
      required: true,
      unique: true,
    },
    schoolId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: true,
    },
    employmentType: {
      type: String,
      enum: {
        values: EMPLOYMENT_TYPES,
        message:
          "{VALUE} is not supported. Must be one of: " +
          EMPLOYMENT_TYPES.join(", "),
      },
      required: true,
      set: (v) => capitalizeFirstLetter(v),
    },
    department: {
      type: String,
      enum: {
        values: DEPARTMENTS,
        message:
          "{VALUE} is not supported. Must be one of: " + DEPARTMENTS.join(", "),
      },
      required: true,
      set: (v) => capitalizeFirstLetter(v),
    },
    grade: {
      type: String,
      enum: {
        values: GRADES,
        message:
          "{VALUE} is not supported. Must be one of: " + GRADES.join(", "),
      },
      required: true,
      set: (v) => capitalizeFirstLetter(v),
    },
    role: {
      type: String,
      enum: {
        values: ROLES,
        message:
          "{VALUE} is not supported. Must be one of: " + ROLES.join(", "),
      },
      required: true,
      set: (v) => capitalizeFirstLetter(v),
    },
    classScope: [
      {
        type: String,
        enum: {
          values: CLASS_SCOPES,
          message:
            "{VALUE} is not supported. Must be one of: " +
            CLASS_SCOPES.join(", "),
        },
        required: true,
        set: (v) => capitalizeFirstLetter(v),
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
        enum: {
          values: MEDIUMS,
          message:
            "{VALUE} is not supported. Must be one of: " + MEDIUMS.join(", "),
        },
        required: true,
        set: (v) => capitalizeFirstLetter(v),
      },
    ],
    otherMedium: String,
    boardOfEducation: [
      {
        type: String,
        enum: {
          values: BOARDS,
          message:
            "{VALUE} is not supported. Must be one of: " + BOARDS.join(", "),
        },
        required: true,
        set: (v) => capitalizeFirstLetter(v),
      },
    ],
    otherBoard: String,
    subjectsTaught: [
      {
        type: String,
        enum: {
          values: SUBJECTS,
          message:
            "{VALUE} is not supported. Must be one of: " + SUBJECTS.join(", "),
        },
        required: true,
        set: (v) => capitalizeFirstLetter(v),
      },
    ],
    category: [
      {
        type: String,
        enum: {
          values: CATEGORIES,
          message:
            "{VALUE} is not supported. Must be one of: " +
            CATEGORIES.join(", "),
        },
        required: true,
        set: (v) => capitalizeFirstLetter(v),
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
      enum: {
        values: JOB_STATUS,
        message:
          "{VALUE} is not supported. Must be one of: " + JOB_STATUS.join(", "),
      },
      required: true,
      set: (v) => capitalizeFirstLetter(v),
    },
    additionalComments: String,
  },
  {
    timestamps: true,
  }
);

jobSchema.index({ schoolId: 1 });
jobSchema.index({ status: 1 });
jobSchema.index({ department: 1, role: 1 });

const Job = mongoose.model("Job", jobSchema);
export default Job;
