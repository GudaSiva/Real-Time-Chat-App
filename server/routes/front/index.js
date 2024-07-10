const express = require("express");
const router = express.Router();

router.use("/user", require("./user.route"));
router.use("/chat", require("./chat.router"));
router.use("/message", require("./message.route"));
module.exports = router;
