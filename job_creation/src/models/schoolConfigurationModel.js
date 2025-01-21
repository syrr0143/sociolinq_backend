import mongoose from "mongoose";
import {
  DEPARTMENTS,
  EMPLOYMENT_TYPES,
  GRADES,
  ROLES,
  CLASS_SCOPES,
  MEDIUMS,
  BOARDS,
  SUBJECTS,
} from "../constants/enum.js";

const schoolConfigSchema = new mongoose.Schema(
  {
    schoolId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: true,
    },
    departments: [
      {
        type: String,
        enum: DEPARTMENTS,
      },
    ],
    employmentTypes: [
      {
        type: String,
        enum: EMPLOYMENT_TYPES,
      },
    ],
    grades: [
      {
        type: String,
        enum: GRADES,
      },
    ],
    roles: [
      {
        department: {
          type: String,
          enum: DEPARTMENTS,
          required: true,
        },
        availableRoles: [
          {
            type: String,
            enum: ROLES,
          },
        ],
      },
    ],
    classScopes: [
      {
        type: String,
        enum: CLASS_SCOPES,
      },
    ],
    workLocations: [
      {
        type: String,
        required: true,
      },
    ],
    mediums: [
      {
        type: String,
        enum: MEDIUMS,
      },
    ],
    otherMediums: [String],
    boards: [
      {
        type: String,
        enum: BOARDS,
      },
    ],
    otherBoards: [String],
    subjects: [
      {
        type: String,
        enum: SUBJECTS,
      },
    ],
    lastUpdated: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

schoolConfigSchema.index({ schoolId: 1 });

const SchoolConfig = mongoose.model("SchoolConfig", schoolConfigSchema);
export default SchoolConfig;
