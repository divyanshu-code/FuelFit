import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,

  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    default: null,
  },
  height: {
    type: Number,
    default: null,
  },
  weight: {
    type: Number,
    default: null,
  },
  fitnessGoal: {
    type: String,
    enum: ["Stay Fit", "Muscle Gain", "Fat Loss", "Weight Gain"],
    default: null,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
    default: null
  },
  hasFitnessDetails: {
    type: Boolean,
    default: false
  },
  profileImage: { 
    type: String, 
    default: "" 
  }

}, { minimize: false });


const userModel = mongoose.models.user || mongoose.model("user", userSchema)
export default userModel;