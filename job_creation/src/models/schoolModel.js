import mongoose from "mongoose";
const schoolSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  establishedYear: {
    type: Number,
    required: true,
  },
  principal: {
    type: String,
    required: true,
  },
  professor: [
    {
      type: String,
    },
  ],
  departments: [
    {
      type: String,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const School = mongoose.model("School", schoolSchema);

export default School;
