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
    employmentType: {
      type: String,
      enum: {
        values: EMPLOYMENT_TYPES,
        message:
          "{VALUE} is not supported. Must be one of: " +
          EMPLOYMENT_TYPES.join(", "),
      },
      required: true,
      set: (v) => v?.toUpperCase(),
    },
    department: {
      type: String,
      enum: {
        values: DEPARTMENTS,
        message:
          "{VALUE} is not supported. Must be one of: " + DEPARTMENTS.join(", "),
      },
      required: true,
      set: (v) => v?.toUpperCase(),
    },
    grade: {
      type: String,
      enum: {
        values: GRADES,
        message:
          "{VALUE} is not supported. Must be one of: " + GRADES.join(", "),
      },
      required: true,
      set: (v) => v?.toUpperCase(),
    },
    role: {
      type: String,
      enum: {
        values: ROLES,
        message:
          "{VALUE} is not supported. Must be one of: " + ROLES.join(", "),
      },
      required: true,
      set: (v) => v?.toUpperCase(),
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
        set: (v) => v?.toUpperCase(),
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
        set: (v) => v?.toUpperCase(),
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
        set: (v) => v?.toUpperCase(),
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
        set: (v) => v?.toUpperCase(),
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
        set: (v) => v?.toUpperCase(),
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
      set: (v) => v?.toUpperCase(),
    },
    additionalComments: String,
  },
  {
    timestamps: true,
  }
);
jobSchema.pre("validate", function (next) {
  if (this.employmentType)
    this.employmentType = this.employmentType.toUpperCase();
  if (this.department) this.department = this.department.toUpperCase();
  if (this.grade) this.grade = this.grade.toUpperCase();
  if (this.role) this.role = this.role.toUpperCase();
  if (this.classScope)
    this.classScope = this.classScope.map((scope) => scope.toUpperCase());
  if (this.medium) this.medium = this.medium.map((m) => m.toUpperCase());
  if (this.boardOfEducation)
    this.boardOfEducation = this.boardOfEducation.map((b) => b.toUpperCase());
  if (this.subjectsTaught)
    this.subjectsTaught = this.subjectsTaught.map((s) => s.toUpperCase());
  if (this.category) this.category = this.category.map((c) => c.toUpperCase());
  next();
});

jobSchema.index({ schoolConfigId: 1 });
jobSchema.index({ status: 1 });
jobSchema.index({ department: 1, role: 1 });

const Job = mongoose.model("Job", jobSchema);
export default Job;
