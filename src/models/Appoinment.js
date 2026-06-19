// models/Appointment.js

const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    name: String,
    phone: String,
    email: String,
    treatment: String,
    message: String,
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "Appointment",
  appointmentSchema
);