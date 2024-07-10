const { httpResponses } = require("../constants/http-responses.constant");
const { httpsStatusCodes } = require("../constants/http-status-codes.constant");
const { Chat } = require("../models/chat.model");
const { successResponse, errorResponse } = require("../utils/responses.util");

const createChat = async (req, res) => {
  const { first_user_id, second_user_id } = req.body;
  try {
    const chat = await Chat.findOne({
      members: { $all: [first_user_id, second_user_id] },
    });
    if (chat) {
      return res.json(
        successResponse(
          chat,
          "CHAT_USERS_FETCHED_SUCCESSFULLY",
          httpsStatusCodes.SUCCESS,
          httpResponses.SUCCESS
        )
      );
    }
    const createChatDetails = await Chat.create({
      members: [first_user_id, second_user_id],
    });
    const response = await createChatDetails.save();
    return res.json(
      successResponse(
        response,
        "CHAT_USERS_CREATED_SUCCESSFULLY",
        httpsStatusCodes.SUCCESS,
        httpResponses.SUCCESS
      )
    );
  } catch (error) {
    console.log(/error/, error);
    return res.json(
      errorResponse(
        "SOME_THING_WENT_WRONG_WHILE_CREATING_CHAT",
        httpsStatusCodes.INTERNAL_SERVER_ERROR,
        httpResponses.INTERNAL_SERVER_ERROR
      )
    );
  }
};

const findAllChats = async (req, res) => {
  const userId = req.params.userId;
  try {
    const chat = await Chat.find({
      members: { $in: [userId] },
    });
    console.log(/chat/, chat);
    return res.json(
      successResponse(
        chat,
        "CHAT_USERS_FETCHED_SUCCESSFULLY",
        httpsStatusCodes.SUCCESS,
        httpResponses.SUCCESS
      )
    );
  } catch (error) {
    return res.json(
      errorResponse(
        "SOME_THING_WENT_WRONG_WHILE_FETCHING_",
        httpsStatusCodes.INTERNAL_SERVER_ERROR,
        httpResponses.INTERNAL_SERVER_ERROR
      )
    );
  }
};

const findChat = async (req, res) => {
  const { first_user_id, second_user_id } = req.params;
  try {
    const chat = await Chat.findOne({
      members: { $all: [first_user_id, second_user_id] },
    });
    return res.json(
      successResponse(
        chat,
        "USER_CHAT_FETCHED_SUCCESSFULLY",
        httpsStatusCodes.SUCCESS,
        httpResponses.SUCCESS
      )
    );
  } catch (error) {
    console.log(/error/, error);
    return res.json(
      errorResponse(
        "SOME_THING_WENT_WRONG_WHILE_FETCHING_USER_SINGLE_CHAT",
        httpsStatusCodes.INTERNAL_SERVER_ERROR,
        httpResponses.INTERNAL_SERVER_ERROR
      )
    );
  }
};
module.exports = { createChat, findAllChats, findChat };
