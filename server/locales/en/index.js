const { messages } = require("./message.en.js");
const { validations } = require("./validation.en.js");
const { errors } = require("./error.en.js");

const enTranslations = { ...messages, ...validations, ...errors };

module.exports = { enTranslations };
