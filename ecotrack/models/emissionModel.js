const mongoose = require("mongoose");

const emissionSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please enter username"],
    },
    date: {
      type: Date,
      default: Date.now,
    },
    emissions: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      required: false,
    },
    source: {
      type: String,
      required: false,
    },
  },
  {
    timestamp: true,
  }
);
const Emission = mongoose.model("Emission", emissionSchema);
module.exports = Emission;
