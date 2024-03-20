const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// POST /api/login (User login)
router.post("/api/login", authController.login);

module.exports = router;
