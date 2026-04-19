require("dotenv").config();

const http = require("http");
const app = require("./src/app");
const connectDB = require("./src/db/db");
const initSocket = require("./src/web/socket.io");

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

initSocket(server);

connectDB();

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
