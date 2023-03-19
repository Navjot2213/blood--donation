const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    bloodGroup: {
        type: String,
        required: true,
    },
    Medical_Condition: {
        type: Array,
    },
    dob: {
        type: Date,
        required: true,
    },
    rewardPoints: {
        type: Number,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("User_Info", userSchema);