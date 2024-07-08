"use strict";
const i18n = require("i18n");
const { langConstants } = require("../constants/lang.constant");

const setLocalLang = (req, res, next) => {
  const preferredLanguage =
    req.headers["accept-language"] || langConstants.default_locale;
  if (preferredLanguage) {
    i18n.setLocale(preferredLanguage);
    next();
  }
};
module.exports = { setLocalLang };
