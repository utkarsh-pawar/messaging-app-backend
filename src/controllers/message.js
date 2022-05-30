import * as returnResponse from "../helpers/response.js";
import twilio from "twilio";
import config from "../configs/config.js";
import otp from "otp-generator";

const Twilio = twilio(config.TWILIO_SID, config.TWILIO_AUTH_TOKEN);
import Message from "../models/messages.model.js";

export const sendOtp = async (req, res) => {
  try {
    const { _id } = req.profile;
    const { contact_no } = req.body;
    const generatedOtp = otp.generate(4, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    const messageSent = await Twilio.messages.create({
      from: "+15312025521",
      to: `+91${contact_no}`,
      body: `Your otp from twilio is ${generatedOtp}`,
    });
    const response = await Message.create({
      user_id: _id,
      message_body: messageSent.body,
      sent_date: messageSent.dateCreated,
      otp: generatedOtp,
      send_to: messageSent.to,
      send_from: messageSent.from,
    });
    Message;
    res.status(200).json(returnResponse.success(response));
  } catch (e) {
    res.status(400).json(returnResponse.error(e));
  }
};
export const sendMsg = async (req, res) => {
  try {
    const { _id } = req.profile;
    const { contact_no, message } = req.body;
    const generatedOtp = otp.generate(4, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    const messageSent = await Twilio.messages.create({
      from: "+15312025521",
      to: `+91${contact_no}`,
      body: message,
    });
    const response = await Message.create({
      user_id: _id,
      message_body: messageSent.body,
      sent_date: messageSent.dateCreated,
      otp: generatedOtp,
      send_to: messageSent.to,
      send_from: messageSent.from,
    });
    Message;
    res.status(200).json(returnResponse.success(response));
  } catch (e) {
    res.status(400).json(returnResponse.error(e));
  }
};

export const getMessages = async (req, res) => {
  try {
    const { _id } = req.profile;
    const response = await Message.find({ user_id: _id });
    res.status(200).json(returnResponse.success(response));
  } catch (e) {
    res.status(400).json(returnResponse.error(e));
  }
};
