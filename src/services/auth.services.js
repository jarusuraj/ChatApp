const bcrypt = require("bcrypt");
const { createUser, findUserByEmail } = require("../repository/auth.repository");
const { createAccessToken, createRefreshToken } = require("./token.services");

const signupService = async (data) => {
  const { email, password } = data;

  const hashedPassword = bcrypt.hashSync(password, 10);
  const userData = {
    email,
    password: hashedPassword,
  };
  const user = await createUser(userData);
  return user;
};

const loginService = async (data) => {
  const { email, password } = data;
  const user = await findUserByEmail(email);
  if (!user) {
    throw new Error("User not found");
  }
  const isPasswordValid = bcrypt.compareSync(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid password");
  }

  const result = {};
  result.accessToken = createAccessToken({ id: user._id, email: user.email });
  result.refreshToken = createRefreshToken({ id: user._id, email: user.email });
  return result;
};

module.exports = { signupService, loginService };
