const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const router = express.Router();

// Protected route example — apply authMiddleware to routes that need auth
router.get("/me", authMiddleware, (req, res) => {
  res.status(200).json({ user: req.user });
});

module.exports = router;
