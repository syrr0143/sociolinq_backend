import mongoose from "mongoose";

const jobSpecificSchema = new mongoose.Schema({
  // Job-Specific Requirements
  jobId: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  employmentType: {
    type: String,
    enum: ["Full-time", "Part-time", "Contract", "Internship"],
    required: true,
  },
  department: {
    type: String,
    enum: ["Engineering", "Marketing", "HR", "Finance", "Sales", "Operations"],
    required: true,
  },
  grade: {
    type: String,
    enum: ["Junior", "Mid-level", "Senior", "Lead", "Manager", "Director"],
    required: true,
  },
  role: {
    type: String,
    enum: [
      "Software Engineer",
      "HR Specialist",
      "Marketing Manager",
      "Product Manager",
      "Sales Executive",
    ],
    required: true,
  },
  classScope: {
    type: String,
    enum: ["Entry Level", "Mid-Level", "Experienced", "Executive"],
    required: true,
  },
  workLocation: {
    type: String,
    enum: ["Remote", "On-site", "Hybrid"],
    required: true,
  },
  openPositions: { type: Number, required: true },
  // candiadte specific requirements
  medium: {
    type: String,
    enum: ["English", "Hindi", "Bilingual", "Others"],
    required: true,
  },
  boardOfEducation: {
    type: String,
    enum: ["CBSE", "ICSE", "State Board", "International", "Other"],
    required: true,
  },
  subjectTaught: {
    type: [String],
    required: true,
  },
  category: {
    type: String,
    enum: ["General", "OBC", "SC", "ST", "EWS"],
    required: true,
  },
  minAge: { type: Number, required: true },
  maxAge: { type: Number, required: true },
  minExperience: { type: Number, required: true },
  maxExperience: { type: Number, required: true },
  degree: {
    type: String,
    enum: ["B.Tech", "M.Tech", "B.Sc", "M.Sc", "MBA", "PhD", "Other"],
    required: true,
  },
  specialization: { type: String, required: true },
  university: { type: String, required: true },
  marksRequired: { type: Number, required: true },
  jobDescriptionAttached: { type: String }, // url of file attached , uploaded somewhere
  comment: { type: String },
});

const Job = mongoose.model("Job", jobSpecificSchema);
export default Job;
