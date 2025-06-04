import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    Fullname: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },

    profilePic: {
      type: String,
      required: false,
    },

    gender: {
      type: String,
      enum: ["male", "female"],
      required: true,
    },
    resetToken: String,

    resetTokenExpiry: Date,
  },
  { timestamps: true }
);
const User = mongoose.model.User || mongoose.model("User", UserSchema);

export default User;
