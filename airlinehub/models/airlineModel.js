const mongoose = require("mongoose");

const airlineSchema = mongoose.Schema(
  {
    airline: {
      type: String,
      required: [true, "Please enter a airline name"],
    },
    flightNumber: {
      type: String,
      required: true,
    },
    departureCity: {
      type: String,
      required: true,
    },
    arrivalCity: {
      type: String,
      required: true,
    },
    departureTime: {
      type: Date,
      required: true,
    },
    arrivalTime: {
      type: Date,
      required: true,
    },
  },
  {
    timestamp: true,
  }
);
const Airline = mongoose.model("Airline", airlineSchema);
module.exports = Airline;
