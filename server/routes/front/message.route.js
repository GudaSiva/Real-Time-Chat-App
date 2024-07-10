const express = require("express");
const {
  createMessage,
  getMessage,
} = require("../../controllers/message.controller");
const { validateInput } = require("../../utils/validate.util");
const { createMessageSchema } = require("../../validations/message.validation");
const router = express.Router();

router.use("/create", validateInput(createMessageSchema), createMessage);

router.use("/find/:chatId", getMessage);

module.exports = router;
