const Message = require("../models/message.model");

const saveMessage = async (data) => {
  return await Message.create(data);
};

const getUndeliveredMessages = async (userId) => {
  return await Message.find({
    toUserId: userId,
    isDelivered: false,
  }).sort({ createdAt: 1 });
};

const markSingleMessageDelivered = async (messageId) => {
  return await Message.findByIdAndUpdate(messageId, {
    isDelivered: true,
  });
};

const markMessagesDelivered = async (userId) => {
  return await Message.updateMany(
    { toUserId: userId, isDelivered: false },
    { $set: { isDelivered: true } },
  );
};

module.exports = {
  saveMessage,
  getUndeliveredMessages,
  markSingleMessageDelivered,
  markMessagesDelivered,
};
