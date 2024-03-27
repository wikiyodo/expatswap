module.exports = {
  // MongoDB connection URI
  MONGODB_URI: process.env.MONGODB_URI || "mongodb://localhost:27017/expatswap",

  // Port for the Express server
  PORT: process.env.PORT || 3000,
};
