const User = require("../models/user");

// ===============================
// Signup Form Page - Display the Signup Form
// ===============================
const createSignupForm = (req, res) => {
  // Render the signup page with flash messages for success or error
  res.render("signup.ejs", {
    success: req.flash("success"),
    error: req.flash("error")
  });
};

// ===============================
// Handle Signup - Create a new user
// ===============================
const signup = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Create a new User instance with the provided email and username
    const newUser = new User({ email, username });
    
    // Register the new user with the provided password (passport-local-mongoose handles password hashing)
    await User.register(newUser, password);

    // Flash success message and redirect to login page
    req.flash("success", "New User Created successfully");
    res.redirect("/login");

  } catch (err) {
    // Flash error message and redirect to signup page if registration fails
    req.flash("error", err.message || "New User Not Created");
    res.redirect("/signup");
  }
};

// ===============================
// Login Form Page - Display the Login Form
// ===============================
const createLoginForm = (req, res) => {
  // Render the login page with flash messages for success or error
  res.render("login.ejs", {
    success: req.flash("success"),
    error: req.flash("error")
  });
};

// ===============================
// Redirect after successful login
// ===============================
const loginHome = (req, res) => {
  // Flash a success message upon successful login
  req.flash("success", "You have successfully logged in!");
  res.redirect("/"); // Redirect to the home page
};

// Export the controller functions
module.exports = { 
  createSignupForm, 
  createLoginForm, 
  signup, 
  loginHome 
};



