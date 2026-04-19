const repo = require("../repository/messages.repository");

const sendMessage = async (data) => {
  return await repo.saveMessage(data);
};

const getPendingMessages = async (userId) => {
  return await repo.getUndeliveredMessages(userId);
};

const markSingleMessageDelivered = async (messageId) => {
  return await repo.markSingleMessageDelivered(messageId);
};

const markMessagesDelivered = async (userId) => {
  return await repo.markMessagesDelivered(userId);
};

module.exports = {
  sendMessage,
  getPendingMessages,
  markSingleMessageDelivered,
  markMessagesDelivered,
};
