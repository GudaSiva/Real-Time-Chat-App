const { httpResponses } = require("../constants/http-responses.constant");
const { httpsStatusCodes } = require("../constants/http-status-codes.constant");
const { Message } = require("../models/message.model");
const { successResponse, errorResponse } = require("../utils/responses.util");

const createMessage = async (req, res) => {
  try {
    const { chat_id, sender_id, text } = req.body;
    const createMessageDetails = await Message.create({
      chat_id,
      sender_id,
      text,
    });
    const response = await createMessageDetails.save();
    return res.json(
      successResponse(
        response,
        "MESSAGE_CREATED_SUCCESSFULLY",
        httpsStatusCodes.SUCCESS,
        httpResponses.SUCCESS
      )
    );
  } catch (error) {
    return res.json(
      errorResponse(
        "SOME_THING_WENT_WRONG_WHILE_CREATING_MESSAGE",
        httpsStatusCodes.INTERNAL_SERVER_ERROR,
        httpResponses.INTERNAL_SERVER_ERROR
      )
    );
  }
};

const getMessage = async (req, res) => {
  const { chatId } = req.params;
  console.log(/message/, chatId);
  try {
    const messageDetails = await Message.find({ chat_id: chatId });
    console.log(/message/, messageDetails);
    return res.json(
      successResponse(
        messageDetails,
        "MESSAGE_FETCHED_SUCCESSFULLY",
        httpsStatusCodes.SUCCESS,
        httpResponses.SUCCESS
      )
    );
  } catch (error) {
    return res.json(
      errorResponse(
        "SOME_THING_WENT_WRONG_WHILE_FETCHING_MESSAGE",
        httpsStatusCodes.INTERNAL_SERVER_ERROR,
        httpResponses.INTERNAL_SERVER_ERROR
      )
    );
  }
};

module.exports = { createMessage, getMessage };
