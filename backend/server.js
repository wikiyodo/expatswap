const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

// Import routes
const userRoutes = require("./src/routes/userRoutes");
const authRoutes = require("./src/routes/authRoutes");

// Load environment variables from .env file
dotenv.config();

// Create Express app
const app = express();

async function startServer() {
  // Middleware to parse JSON bodies
  app.use(express.json());
  // Enable CORS for requests from localhost:3000
  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true, // Optional: if you're using cookies or sessions
    })
  );

  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("connected to MongoDB");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }

  // Routes
  app.use("/api/users", userRoutes);
  app.use("/api/auth", authRoutes);

  app.use((err, req, res, next) => {
    console.error(err); // Log the error for debugging purposes
    res.status(400).json({ error: err.message || "Unknown Error" });
  });

  // Start the server
  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

startServer();
