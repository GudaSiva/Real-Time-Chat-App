const joi = require("joi");

const createMessageSchema = joi.object({
  chat_id: joi.string().required().messages({
    "any.required": "CHAT_ID IS REQUIRED",
    "string.empty": "CHAT_ID CANNOT BE EMPTY",
  }),
  sender_id: joi.string().required().messages({
    "any.required": "SENDER_ID IS REQUIRED",
    "string.empty": "SENDER_ID CANNOT BE EMPTY",
  }),
  text: joi.string().required().messages({
    "any.required": "TEXT IS REQUIRED",
    "string.empty": "TEXT CANNOT BE EMPTY",
  }),
});

module.exports = { createMessageSchema };
