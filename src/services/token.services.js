const jwt = require("jsonwebtoken");

const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "15m" });
};

const createRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_SECRET_KEY, { expiresIn: "7d" });
};

const refreshTokenHandler = (refreshToken) => {
  const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET_KEY);
  const accessToken = createAccessToken({ id: decoded.id });
  return accessToken;
};

module.exports = { createAccessToken, createRefreshToken, refreshTokenHandler };