const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
  {
    chatId: String,
    senderId: String,
    content: {
      type: String,
      required: true,
    },
    imageName: String,
    contentType: {
      type: String,
      enum: ['text', 'image'],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const messageModel = mongoose.model('Message', messageSchema);

module.exports = messageModel;
