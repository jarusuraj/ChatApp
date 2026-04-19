const { Login, Signup, refreshToken } = require("../controllers/auth.controller");

const express = require("express");
const router = express.Router();

router.post("/login", Login);
router.post("/signup", Signup);
router.post("/refresh-token", refreshToken);

module.exports = router;
