const authModel = require("../models/auth.model");
const createUser = async (data) => {
  const CreatedUser = await authModel.create(data);
  return CreatedUser;
};

const findUserByEmail = async (email) => {
  const user = await authModel.findOne({ email });
  return user;
};

module.exports = { createUser, findUserByEmail };
