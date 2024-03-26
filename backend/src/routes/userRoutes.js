const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const createUserSchemaValidator = require("../middleware/createUserSchemaValidator");

// POST /api/users (Create a new user)
router.post("/", createUserSchemaValidator, userController.createUser);

// GET /api/users (Fetch users)
router.get("/", userController.getUsers);

module.exports = router;
