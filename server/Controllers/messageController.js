const { writeToLog } = require('../log/makeLog');
const messageModel = require('../Models/messageModel');

const createMessage = async (req, res) => {
  const { chatId, senderId, content, contentType } = req.body;

  const message = new messageModel({
    chatId,
    senderId,
    content,
    contentType,
  });

  try {
    const response = await message.save();
    writeToLog(response.chatId, senderId, content, contentType, response.createdAt);

    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const getMessages = async (req, res) => {
  const { chatId } = req.params;

  try {
    const messages = await messageModel.find({ chatId });
    res.status(200).json(messages);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = { createMessage, getMessages };
