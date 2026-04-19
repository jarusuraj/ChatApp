const express = require("express");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");

const app = express();
app.use(
  cors({
    origin: "74.220.56.0/24",
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());
app.use(express.static("public"));
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/auth", authRoutes);
app.use("/user", userRoutes);

module.exports = app;
