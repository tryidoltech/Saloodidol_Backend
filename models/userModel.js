const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    username: {
      type: String,
      required: true,
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

    image: {
      type: String,
      validate: {
        validator: function (v) {
          return /\.(png|jpg|jpeg)$/.test(v);
        },
        message: "Image must be a valid file type: png, jpg, or jpeg.",
      },
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
    otp: {
      type: Number,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    branchId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Branch",
      },
    ],
    disable: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
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

userSchema.methods.verifyPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("User", userSchema);
