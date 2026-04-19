const { signupService, loginService } = require("../services/auth.services");
const { refreshTokenHandler } = require("../services/token.services");

const Signup = async (req, res) => {
  try {
    const user = await signupService(req.body);
    res.status(201).json({
      message: "User created successfully",
      user,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error creating user",
      error: err.message,
    });
  }
};

const Login = async (req, res) => {
  try {
    const user = await loginService(req.body);
    res.cookie("accessToken", user.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60 * 1000, // 15 minutes
    });
    res.cookie("refreshToken", user.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    res.status(200).json({
      message: "Login successful",
      user,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error logging in",
      error: err.message,
    });
  }
};

const refreshToken = async (req, res) => {
  try {
    const accessToken = refreshTokenHandler(req.cookies.refreshToken);
    res
      .cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 15 * 60 * 1000, // 15 minutes
      })
      .status(200)
      .json({
        message: "Token refreshed successfully",
      });
  } catch (err) {
    res.status(401).json({
      message: "Error refreshing token",
      error: err.message,
    });
  }
};

module.exports = { Login, Signup, refreshToken };
