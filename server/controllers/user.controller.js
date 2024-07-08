"use strict";

const { successResponse, errorResponse } = require("../utils/responses.util");

const registerController = async (req, res) => {
  try {
    return res.json(successResponse("USER_REGISTERED_SUCCESSFULLY"));
  } catch (error) {
    console.log(
      `Some thing went wrong while creating register controller : ${error} `
    );
    return res.json(errorResponse("SOME_THING_WENT_WRONG_WHILE_REGISTER_API"));
  }
};

module.exports = { registerController };
