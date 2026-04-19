const { Server } = require("socket.io");
const ioMiddleware = require("../middleware/io.middleware");
const { registerChatHandlers } = require("../handler/chat.handler");
const {
  addUser,
  removeUser,
  getAllUsers,
} = require("../state/onlineUsers.state");
const messageService = require("../services/message.services");

let io;

module.exports = (server) => {
  io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.use(ioMiddleware);

  io.on("connection", async (socket) => {
    console.log("Connected:", socket.id);

    const userId = socket.user.id;
    const email = socket.user.email;

    addUser(userId, socket.id, email);

    // Broadcast updated online users list to everyone
    io.emit("online-users", getAllUsers());

    try {
      const pending = await messageService.getPendingMessages(userId);

      if (pending.length > 0) {
        pending.forEach((msg) => {
          socket.emit("private-message", msg);
        });

        await messageService.markMessagesDelivered(userId);
      }
    } catch (err) {
      console.error("Pending fetch error:", err);
    }

    registerChatHandlers(io, socket);

    socket.on("disconnect", () => {
      removeUser(userId);
      console.log("Disconnected:", socket.id);
      // Broadcast updated list after disconnect
      io.emit("online-users", getAllUsers());
    });
  });
};
