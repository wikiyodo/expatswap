const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

// POST /api/users (Create a new user)
router.post("/api/users", userController.createUser);

// GET /api/users (Fetch users)
router.get("/api/users", authMiddleware, userController.getUsers);

module.exports = router;
