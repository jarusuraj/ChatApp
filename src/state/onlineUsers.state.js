const onlineUsers = new Map(); // userId -> { socketId, email }

const addUser = (userId, socketId, email) => {
  onlineUsers.set(userId.toString(), { socketId, email });
};

const removeUser = (userId) => {
  onlineUsers.delete(userId.toString());
};

const getSocketId = (userId) => {
  return onlineUsers.get(userId.toString())?.socketId;
};

const getAllUsers = () => {
  return Array.from(onlineUsers.entries()).map(([userId, data]) => ({
    userId,
    email: data.email,
  }));
};

module.exports = {
  addUser,
  removeUser,
  getSocketId,
  getAllUsers,
};
