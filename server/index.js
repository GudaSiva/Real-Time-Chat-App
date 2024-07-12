"use strict";
const express = require("express");
const path = require("path");
const http = require("http"); // Import http to create a server
const { Server } = require("socket.io"); // Import Server from socket.io
const cors = require("cors");
const helmet = require("helmet");
const i18n = require("i18n");
const bodyParser = require("body-parser");
require("dotenv").config();

// Create an Express application
const app = express();

// Create an HTTP server
const server = http.createServer(app);

// Create a new instance of Socket.IO, attaching it to the HTTP server
const io = new Server(server, {
  cors: {
    origin: "http://localhost:4000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("Socket connected:", socket.id);

  socket.on("disconnect", () => {
    // Remove the user from the map on disconnect
    for (let userId in socketUserMap) {
      if (socketUserMap[userId] === socket.id) {
        delete socketUserMap[userId];
        break;
      }
    }
    console.log(`Socket ${socket.id} disconnected`);
  });
});

// File imports
const { mongoDBConnection } = require("./db/db-connection.db");
const { port } = require("./configs/global.config");
const { setLocalLang } = require("./middleware/i18n.middleware");
const { langConstants } = require("./constants/lang.constant");
const { enTranslations } = require("./locales/en");
const { hiTranslations } = require("./locales/hi");

// Internationalization Configuration
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
app.use(express.static(path.resolve(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));
// Middlewares
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use("/api", express.static("public"), require("./routes/index"));

// Start the server
server.listen(port, () => {
  mongoDBConnection();
  console.log(`Server running on port: ${port}`);
});
