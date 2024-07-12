"use strict";
const bcrypt = require("bcrypt");
const csv = require("csvtojson");
const { httpResponses } = require("../constants/http-responses.constant");
const { httpsStatusCodes } = require("../constants/http-status-codes.constant");
const { successResponse, errorResponse } = require("../utils/responses.util");
const { User } = require("../models/user.model");
const { Gender } = require("../constants/user.constant");
const { jwt_secret_key, token_expires } = require("../configs/jwt.config");
const jwt = require("jsonwebtoken");
const { generateHash, compareString } = require("../utils/password.util");

const registerController = async (req, res) => {
  try {
    // User required body details
    const { full_name, user_name, email, password, confirm_password, gender } =
      req.body;
    // user password and confirm password should match
    if (password !== confirm_password) {
      return res.json(
        errorResponse(
          "PASSWORD_AND_CONFIRM_PASSWORD_SHOULD_BE_SAME",
          httpsStatusCodes.BAD_REQUEST,
          httpResponses.BAD_REQUEST
        )
      );
    }
    const passHash = await generateHash(password);
    // finds if user exists in db
    const userDetails = await User.findOne({ email });
    if (userDetails) {
      if (userDetails.user_name) {
        return res.json(errorResponse("USER_NAME_ALREADY_EXITS"));
      }
      return res.json(
        errorResponse(
          "USER ALREADY EXISTS",
          httpsStatusCodes.ALREADY_EXISTS,
          httpResponses.NOT_FOUND
        )
      );
    }
    // default avatar emoji's from google
    const maleProfileImage = `https://avatar.iran.liara.run/public/boy?username=${user_name}`;
    const femaleProfileImage = `https://avatar.iran.liara.run/public/girl?username=${user_name}`;

    const userCreate = await User.create({
      full_name,
      user_name,
      email,
      password: passHash,
      gender,
      profile_img:
        gender === Gender.MALE ? maleProfileImage : femaleProfileImage,
    });
    await userCreate.save();
    const userResponse = {
      full_name,
      user_name,
      email,
      gender,
      profile_img:
        gender === Gender.MALE ? maleProfileImage : femaleProfileImage,
    };
    // success response
    return res.json(
      successResponse(
        userResponse,
        "USER_REGISTERED_SUCCESSFULLY",
        httpsStatusCodes.CREATED,
        httpResponses.CREATED
      )
    );
  } catch (error) {
    console.log(/error/, error);
    return res.json(
      errorResponse(
        "SOME_THING_WENT_WRONG_WHILE_REGISTER_API",
        httpsStatusCodes.INTERNAL_SERVER_ERROR,
        httpResponses.INTERNAL_SERVER_ERROR
      )
    );
  }
};

const getUsers = async (req, res) => {
  try {
    const userDetails = await User.find();
    return res.json(
      successResponse(
        userDetails,
        "USERS_FETCHED_SUCCESSFULLY",
        httpsStatusCodes.SUCCESS,
        httpResponses.SUCCESS
      )
    );
  } catch (error) {
    console.log(/error/, error);
    return res.json(
      errorResponse(
        "SOME_THING_WENT_WRONG_WHILE_FETCHING_USERS",
        httpsStatusCodes.INTERNAL_SERVER_ERROR,
        httpResponses.INTERNAL_SERVER_ERROR
      )
    );
  }
};

const login = async (req, res) => {
  try {
    const { user_name, password } = req.body;
    const user = await User.findOne({ user_name, hidePassword: false });
    const checkValidPassword = compareString(password, user.password);
    if (!user && !checkValidPassword) {
      return res.json(errorResponse("INVALID_USER_NAME_AND_PASSWORD"));
    }
    const token = jwt.sign({ _id: user._id }, jwt_secret_key, {
      expiresIn: token_expires,
    });
    // Emit an event to associate the user ID with the socket ID
    io.emit("user_logged_in", { userId: user._id });
    const responses = {
      full_name: user.full_name,
      user_name: user.user_name,
      email: user.email,
      gender: user.gender,
      profile_img: user.profile_img,
      user_token: token,
    };
    return res.json(
      successResponse(
        responses,
        "USER_SUCCESSFULLY_LOGGED_IN",
        httpsStatusCodes.SUCCESS,
        httpResponses.SUCCESS
      )
    );
  } catch (error) {
    console.log(error);
    return res.json(
      errorResponse(
        "SOME_THING_WENT_WRONG_WHILE_LOGIN",
        httpsStatusCodes.INTERNAL_SERVER_ERROR,
        httpResponses.INTERNAL_SERVER_ERROR
      )
    );
  }
};

const fetchUser = async (req, res) => {
  const userId = req.params.userId;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.json(
        errorResponse(
          "USER_NOT_FOUND",
          httpsStatusCodes.NOT_FOUND,
          httpResponses.NOT_FOUND
        )
      );
    }
    return res.json(
      successResponse(
        user,
        "USER_FETCHED_SUCCESSFULLY",
        httpsStatusCodes.SUCCESS,
        httpResponses.SUCCESS
      )
    );
  } catch (error) {
    console.log(/error/, error);
    return res.json(
      errorResponse(
        "SOME_THING_WENT_WRONG_WHILE_FETCH_SINGLE_USER",
        httpsStatusCodes.INTERNAL_SERVER_ERROR,
        httpResponses.INTERNAL_SERVER_ERROR
      )
    );
  }
};

const importUserData = async (req, res) => {
  try {
    const userData = [];
    const csvData = await csv().fromFile(req.file.path);

    for (let row of csvData) {
      // Validation
      if (
        !row.full_name ||
        !row.user_name ||
        !row.email ||
        !row.password ||
        !row.gender ||
        !row.profile_img
      ) {
        return res.json(
          errorResponse(
            "VALIDATION_ERROR_ALL_FIELDS_ARE_REQUIRED",
            httpsStatusCodes.BAD_REQUEST,
            httpResponses.BAD_REQUEST
          )
        );
      }

      // Check for existing user by email or username
      const existingUser = await User.findOne({
        $or: [{ email: row.email }, { user_name: row.user_name }],
      });

      if (!existingUser) {
        userData.push({
          full_name: row.full_name,
          user_name: row.user_name,
          email: row.email,
          password: row.password,
          gender: row.gender,
          profile_img: row.profile_img,
        });
      }
    }

    if (userData.length > 0) {
      await User.insertMany(userData);
      return res.json(
        successResponse(
          "",
          "FILE_IMPORTED_SUCCESSFULLY",
          httpsStatusCodes.SUCCESS,
          httpResponses.SUCCESS
        )
      );
    } else {
      return res.json(
        successResponse(
          "",
          "USERS_ALREADY_EXISTS_THEN_NO_NEW_USERS_TO_IMPORT",
          httpsStatusCodes.SUCCESS,
          httpResponses.SUCCESS
        )
      );
    }
  } catch (error) {
    console.log("error", error);
    return res.json(
      errorResponse(
        "SOME_THING_WENT_WRONG_WHILE_IMPORTING_FILE",
        httpsStatusCodes.INTERNAL_SERVER_ERROR,
        httpResponses.INTERNAL_SERVER_ERROR
      )
    );
  }
};

module.exports = {
  registerController,
  getUsers,
  login,
  fetchUser,
  importUserData,
};
