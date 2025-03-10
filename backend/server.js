// server/server.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config();

// Configurations
const connectDB = require("./config/db");
const { authenticateSpotify } = require("./config/spotify");

const userRoutes = require("./routes/User");
const spotifyRoutes = require("./routes/Spotify");

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // For parsing application/json

// MongoDB connection
connectDB();

// Spotify connection
authenticateSpotify();

// Routes
app.use("/api/user/", userRoutes);
app.use("/api/spotify/", spotifyRoutes);

// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
