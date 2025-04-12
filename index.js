// Import necessary modules
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

// Initialize the app
const app = express();
const PORT = process.env.PORT || 8000; // Default port for local development

// Load environment variables if not in production
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

// Import routes and models
const User = require("./models/user.js");
const writerRoutes = require("./routes/writerRoutes");
const contactRoutes = require("./routes/contactRoutes");
const userRoutes = require("./routes/userRoutes");

// Set up the MongoDB connection string from environment variables
const Mongo_URL = process.env.DB_URL;

// Session store configuration using MongoDB
const store = MongoStore.create({
  mongoUrl: Mongo_URL,
  crypto: { secret: process.env.SECRET }, // Store session secrets securely
  touchAfter: 24 * 3600, // Set session expiration
});

// Session configuration
const sessionOption = {
  store,
  secret: process.env.SECRET, // Session encryption secret
  resave: false, // Do not save session if unmodified
  saveUninitialized: true, // Save uninitialized sessions
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000, // Set cookie expiration to 7 days
    maxAge: 7 * 24 * 60 * 60 * 1000, // Set maximum cookie age
    httpOnly: true, // Ensures cookie is not accessible via JavaScript
  },
};

// Initialize Passport authentication strategy
passport.use(new LocalStrategy(User.authenticate())); // Use LocalStrategy from passport-local-mongoose
passport.serializeUser(User.serializeUser()); // Serialize user information
passport.deserializeUser(User.deserializeUser()); // Deserialize user information

// Setup view engine and static file serving
app.set("view engine", "ejs"); // Use EJS for templating
app.set("views", path.join(__dirname, "views")); // Set views directory
app.use(express.urlencoded({ extended: true })); // Parse form data
app.use(express.static(path.join(__dirname, "public"))); // Serve static files (CSS, JS, images)
app.use(methodOverride("_method")); // Allows using HTTP methods like PUT, DELETE via forms
app.use(session(sessionOption)); // Use session middleware with MongoDB store
app.use(cookieParser()); // Parse cookies
app.use(passport.initialize()); // Initialize Passport for authentication
app.use(passport.session()); // Manage user session
app.use(flash()); // Use flash messages for success/error notifications

// Middleware to send flash messages to views
app.use((req, res, next) => {
  res.locals.success = req.flash("success"); // Success messages
  res.locals.error = req.flash("error"); // Error messages
  next();
});

// Connect to MongoDB
mongoose
  .connect(Mongo_URL) // Connect to MongoDB using the URL from the .env file
  .then(() => console.log("✅ Database connected")) // Log success on connection
  .catch((err) => console.error("❌ Database connection error:", err)); // Log error if connection fails

// Routes for static pages
app.get("/", (req, res) => res.render("index")); // Home page
app.get("/about", (req, res) => res.render("about")); // About page

// Use route files for modularity
app.use("/writers", writerRoutes); // Writers route
app.use("/contact", contactRoutes); // Contact route
app.use("/", userRoutes); // User authentication routes (login/signup)

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`); // Log when server starts
});
