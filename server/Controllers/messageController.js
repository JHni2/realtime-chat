const { writeToLog } = require('../log/makeLog');
const messageModel = require('../Models/messageModel');

const createMessage = async (req, res) => {
  const { chatId, senderId, content, contentType, imageName } = req.body;

  const messageObject = {
    chatId,
    senderId,
    content,
    contentType,
  };

  if (contentType === 'image' && imageName) {
    messageObject.imageName = imageName;
  }

  const message = new messageModel(messageObject);

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
