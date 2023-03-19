const mongoose = require("mongoose");

const campSchema = new mongoose.Schema(
  {
    campName: {
      type: String,
      required: true
    },
    location: {
      type: String,
      required: true,
    },
    donors: {
      type: Array,
      required: true,
    },
    startTime: {
        type: Date,
        required: true,
    },
    endTime: {
        type: Date,
        required: true,
    },
    createdBy: {
      type: String,
      required: true,
    }
  }
);

module.exports = mongoose.model("donation_camp", campSchema);
