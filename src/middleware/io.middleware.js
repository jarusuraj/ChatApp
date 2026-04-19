const jwt = require("jsonwebtoken");

const ioMiddleware = (socket, next) => {
  const token = socket.handshake.auth?.token;

  if (!token) return next(new Error("No token"));

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    socket.user = decoded;
    next();
  } catch {
    next(new Error("Invalid token"));
  }
};

module.exports = ioMiddleware;
