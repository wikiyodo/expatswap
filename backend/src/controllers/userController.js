const userService = require("../services/userService");

const userController = {};

userController.createUser = async (req, res, next) => {
  try {
    const userData = req.body;
    const newUser = await userService.createUser(userData);
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

userController.getUsers = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const startDate = req.query.startDate || null;
    const endDate = req.query.endDate || null;

    const users = await userService.getUsers(page, limit, startDate, endDate);
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

module.exports = userController;
