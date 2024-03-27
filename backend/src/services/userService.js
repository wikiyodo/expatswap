const User = require("../models/userModel");

const userService = {};

userService.createUser = async (userData) => {
  try {
    // Create a new user instance
    const newUser = new User(userData);
    // Save the user to the database
    const savedUser = await newUser.save();
    return savedUser;
  } catch (error) {
    throw new Error("Error creating user: " + error.message);
  }
};

userService.getUsers = async (page, limit) => {
  try {
    // Calculate skip value for pagination
    const skip = (page - 1) * limit;
    // Fetch users from the database
    const [users, totalUsersCount] = await Promise.all([
      User.find().skip(skip).limit(limit),
      User.countDocuments(),
    ]);

    const hasMore = skip + users.length < totalUsersCount;

    return { users, hasMore };
  } catch (error) {
    throw new Error("Error fetching users: " + error.message);
  }
};

module.exports = userService;
