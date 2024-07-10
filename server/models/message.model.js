"use strict";
const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
  {
    chat_id: String,
    sender_id: String,
    text: String,
  },
  {
    timestamps: true,
  }
);
const Message = mongoose.model("Message", MessageSchema);

module.exports = { Message };
