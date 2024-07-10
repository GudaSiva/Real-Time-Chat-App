const joi = require("joi");

const chatCreateSchema = joi.object({
  first_user_id: joi.string().required().messages({
    "any.required": "FIRST_USER_ID IS REQUIRED",
    "string.empty": "FIRST_USER_ID CANNOT BE EMPTY",
  }),
  second_user_id: joi.string().required().messages({
    "any.required": "SECOND_USER_ID IS REQUIRED",
    "string.empty": "SECOND_USER_ID CANNOT BE EMPTY",
  }),
});

module.exports = { chatCreateSchema };
