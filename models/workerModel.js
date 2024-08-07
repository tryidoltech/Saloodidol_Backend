const mongoose = require("mongoose");
const objectId = mongoose.Types.ObjectId;

const workerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      required: true,
    },
    designation: {
      type: String,
      required: true,
      trim: true,
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
    worker_Id: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(v);
        },
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, one number, one special symbol, and be at least 8 characters long.",
      },
    },
    branchId: {
      type: objectId,
      ref: "Branch",
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

workerSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    try {
      const saltRounds = 10;
      this.password = await bcrypt.hash(this.password, saltRounds);
    } catch (error) {
      return next(error);
    }
  }
  next();
});

workerSchema.methods.verifyPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("Worker", workerSchema);
