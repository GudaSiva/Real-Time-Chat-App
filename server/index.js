"use strict";
const express = require("express");
const app = express();

// third party packages
require("dotenv").config();
const cors = require("cors");
const helmet = require("helmet");
const i18n = require("i18n");

// cors connection
app.use(cors(), express.json(), helmet());

// mongo db connection
const { mongoDBConnection } = require("./db/db-connection.db");

// file imports
const { port } = require("./configs/global.config");
const { setLocalLang } = require("./middleware/i18n.middleware");
const { langConstants } = require("./constants/lang.constant");
const { enTranslations } = require("./locales/en");
const { hiTranslations } = require("./locales/hi");

// Internationalisation Configuration
i18n.configure({
  locales: langConstants.locale,
  defaultLocale: langConstants.default_locale,
  staticCatalog: {
    en: enTranslations,
    ar: hiTranslations,
  },
  header: "accept-language",
  extension: ".js",
  retryInDefaultLocale: true,
});

app.use(i18n.init);

app.use((req, res, next) => {
  res.__ = setLocalLang;
  next();
});
// middlewares
app.use(express.json());
app.use("/api", express.static("public"), require("./routes/index"));
// server
app.listen(port, (req, res) => {
  mongoDBConnection();
  console.log(`Server running port: ${port}`);
});
