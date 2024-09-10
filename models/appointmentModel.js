const mongoose = require("mongoose");
const objectId = mongoose.Types.ObjectId;

const appointmentSchema = new mongoose.Schema(
  {
    clientName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
        },
        message: "Email must be a valid email format.",
      },
    },
    mobile: {
      type: Number,
      required: true,
      validate: {
        validator: function (v) {
          const num = Number(v);
          return num >= 6000000000 && num <= 9999999999; // Range check
        },
        message: "Mobile number must be between 6000000000 and 6999999999.",
      },
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    services: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: [
        "PENDING",
        "CONFORM",
        "CHECK IN",
        "REJECTED",
        "NOT COMING",
        "RESCHEDULE",
      ],
      default: "PENDING",
    },
    userId: {
      type: objectId,
      ref: "User",
      required: true,
    },
    workerId: {
      type: objectId,
      ref: "worker",
      required: true,
    },
    branchId: {
      type: objectId,
      ref: "Branch",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Appointment", appointmentSchema);
