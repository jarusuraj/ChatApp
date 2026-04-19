const mongoose = require("mongoose");
const authSchema = new mongoose.Schema({
  email: String,
  password: String,
});
const authModel = mongoose.model("auth", authSchema, "Auths");

module.exports = authModel;
