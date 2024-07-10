const express = require("express");
const router = express.Router();
const {
  createChat,
  findChat,
  findAllChats,
} = require("../../controllers/chat.controller");
const { validateInput } = require("../../utils/validate.util");
const { chatCreateSchema } = require("../../validations/chat.validation");

router.post("/", validateInput(chatCreateSchema), createChat);
router.get("/:userId", findAllChats);
router.get("/find/:first_user_id/:second_user_id", findChat);

module.exports = router;
