const joi = require("joi");
const { Gender } = require("../constants/user.constant");

const registerValidationSchema = joi.object({
  full_name: joi.string().required().messages({
    "any.required": "FULL_NAME_IS_REQUIRED",
    "string.base": "FULL_NAME_MUST_BE_A_STRING",
    "string.empty": "FULL_NAME_CANNOT_BE_EMPTY",
  }),
  user_name: joi.string().required().messages({
    "any.required": "USER_NAME_IS_REQUIRED",
    "string.base": "USER_NAME_MUST_BE_A_STRING",
    "string.empty": "USER_NAME_CANNOT_BE_EMPTY",
  }),
  email: joi.string().email().required().messages({
    "any.required": "EMAIL_IS_REQUIRED",
    "string.email": "INVALID_EMAIL_FORMAT",
    "string.base": "EMAIL_MUST_BE_A_STRING",
    "string.empty": "EMAIL_CANNOT_BE_EMPTY",
  }),
  password: joi.string().required().messages({
    "any.required": "PASSWORD_IS_REQUIRED",
    "string.base": "PASSWORD_MUST_BE_A_STRING",
    "string.empty": "PASSWORD_CANNOT_BE_EMPTY",
  }),
  confirm_password: joi
    .string()
    .required()
    .valid(joi.ref("password"))
    .messages({
      "any.required": "CONFIRM_PASSWORD_IS_REQUIRED",
      "any.only": "PASSWORD_AND_CONFIRM_PASSWORD_SHOULD_BE_SAME",
      "string.base": "CONFIRM_PASSWORD_MUST_BE_A_STRING",
      "string.empty": "CONFIRM_PASSWORD_CANNOT_BE_EMPTY",
    }),
  gender: joi
    .string()
    .valid(Gender.MALE, Gender.FEMALE, Gender.OTHERS)
    .required()
    .messages({
      "any.required": "GENDER_IS_REQUIRED",
      "any.only": "INVALID_GENDER_ONLY(MALE,FEMALE,OTHERS)",
      "string.base": "GENDER_MUST_BE_A_STRING",
      "string.empty": "GENDER_CANNOT_BE_EMPTY",
    }),
});

// Define the Joi schema for login validation
const loginSchema = joi.object({
  user_name: joi.string().required().messages({
    "any.required": "USER_NAME_IS_REQUIRED",
    "string.empty": "USER_NAME_CANNOT_BE_EMPTY",
  }),
  password: joi.string().required().messages({
    "any.required": "PASSWORD_IS_REQUIRED",
    "string.empty": "PASSWORD_CANNOT_BE_EMPTY",
  }),
});

module.exports = { registerValidationSchema, loginSchema };
