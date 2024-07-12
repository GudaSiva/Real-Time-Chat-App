const express = require("express");
const router = express.Router();
const {
  registerController,
  getUsers,
  login,
  fetchUser,
  importUserData,
} = require("../../controllers/user.controller");
const {
  registerValidationSchema,
  loginSchema,
} = require("../../validations/user.validation");
const { validateInput } = require("../../utils/validate.util");
const { upload } = require("../../utils/multer.util");

router.post(
  "/register",
  validateInput(registerValidationSchema),
  registerController
);
router.get("/get-users", getUsers);
router.post("/login", validateInput(loginSchema), login);
router.get("/find/:userId", fetchUser);
router.post("/user-import",upload.single("file"), importUserData)

module.exports = router;
