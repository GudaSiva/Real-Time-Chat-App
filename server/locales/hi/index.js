const { messages } = require("./message.hi.js");
const { validations } = require("./validation.hi.js");
const { errors } = require("./error.hi.js");

const hiTranslations = { ...messages, ...validations, ...errors };

module.exports = { hiTranslations };
