const messageService = require("../services/message.services");
const { getSocketId } = require("../state/onlineUsers.state");

const registerChatHandlers = (io, socket) => {
  // JOIN ROOM (GROUP CHAT)

  socket.on("join-room", (roomId) => {
    if (!roomId) return;

    socket.join(roomId);

    console.log(`User ${socket.user.id} joined room ${roomId}`);

    socket.emit("system-message", {
      message: `Joined room ${roomId}`,
    });
  });

  // ROOM MESSAGE (GROUP CHAT)

  socket.on("send-message", (data) => {
    const { roomId, message } = data;

    if (!roomId || !message) return;

    const payload = {
      userId: socket.user.id,
      message,
      timestamp: Date.now(),
    };

    io.to(roomId).emit("receive-message", payload);
  });

  // LEAVE ROOM

  socket.on("leave-room", (roomId) => {
    if (!roomId) return;

    socket.leave(roomId);

    socket.emit("system-message", {
      message: `Left room ${roomId}`,
    });
  });

  // PRIVATE MESSAGE (1-to-1)

  socket.on("private-message", async (data) => {
    const { toUserId, message } = data;

    if (!toUserId || !message) {
      return socket.emit("system-message", {
        message: "Invalid message data",
      });
    }

    try {
      const savedMessage = await messageService.sendMessage({
        fromUserId: socket.user.id,
        toUserId,
        message,
      });

      const receiverSocketId = getSocketId(toUserId);

      if (receiverSocketId) {
        io.to(receiverSocketId).emit("private-message", savedMessage);

        await messageService.markSingleMessageDelivered(savedMessage._id);
      }
    } catch (err) {
      console.error("Private message error:", err);

      socket.emit("system-message", {
        message: "Message failed to send",
      });
    }
  });
};

module.exports = { registerChatHandlers };
