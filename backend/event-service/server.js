
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const dotenv = require("dotenv");
const rateLimit = require("express-rate-limit");

// Load environment variables
dotenv.config();

// Import routes
const eventRoutes = require("./src/routes/event.routes");

// Import error handler
const errorHandler = require("./src/middleware/error.middleware");

// Create Express app
const app = express();

// Set up rate limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 500,
  standardHeaders: true,
  legacyHeaders: false,
  message: "Too many requests from this IP, please try again after 15 minutes",
});

// Apply rate limiting
app.use(limiter);

// Middleware
app.use(helmet());

// CORS options - FIXED
const corsOptions = {
  origin: [
    process.env.CLIENT_URL,
    "http://localhost:5173",
    "http://localhost:5174",
    "https://univento.vercel.app",
  ].filter(Boolean),
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  optionsSuccessStatus: 200,
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Parse JSON request body
app.use(express.json());

// Import database connection
const connectDB = require("./src/config/db.config");

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/events", eventRoutes);

// Health check route
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Event service is running",
    timestamp: new Date().toISOString(),
  });
});

// Error handling middleware
app.use(errorHandler);

module.exports = app;

// Start server
const PORT = process.env.PORT || 8002;

app.listen(PORT, () => {
  console.log(`Event service running on port ${PORT}`);
});
