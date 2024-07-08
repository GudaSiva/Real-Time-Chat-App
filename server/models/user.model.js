import { Gender } from "../constants/user.constant";

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    full_name: {
      type: String,
      required: true,
    },
    user_name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
    },
    gender: {
      type: String,
      enum: [Gender.MALE, Gender.FEMALE, Gender.OTHERS],
      default: Gender.MALE,
    },
    profile_img: {
      type: String,
      default: null,
    },
    created_at: {
      type: mongoose.Schema.Types.ObjectId,
    },
    updated_at: {
      type: mongoose.Schema.Types.ObjectId,
    },
    deleted_at: {
      type: mongoose.Schema.Types.ObjectId,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
      deletedAt: "deleted_at",
    },
    collection: "users",
  }
);

const User = mongoose.model("User", userSchema);

module.exports = { User };
