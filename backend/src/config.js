module.exports = {
  // MongoDB connection URI
  MONGODB_URI: process.env.MONGODB_URI || "mongodb://localhost:27017/expatswap",

  // JWT secret key
  JWT_SECRET: process.env.JWT_SECRET || "your_secret_key_here",

  // Port for the Express server
  PORT: process.env.PORT || 3000,
};
