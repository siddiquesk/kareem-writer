const express = require("express");
const mongoose = require("mongoose");
if(process.env.NODE_ENV !="production"){
  require("dotenv").config();
}
const path = require("path");
const methodOverride = require('method-override');
const session = require("express-session");
const flash = require("connect-flash");

const app = express();
const PORT = 3000;

// Routes
const writerRoutes = require("./routes/writerRoutes");
const contactRoutes = require("./routes/contactRoutes");


const Mongo_URL = process.env.DB_URL;
const sessionOption = {
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { expires: Date.now() + 7 * 24 * 60 * 60 * 1000, maxAge: 7 * 24 * 60 * 60 * 1000, httpOnly: true }
};

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride('_method'));
app.use(session(sessionOption));
app.use(flash());

// Flash middleware
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

// Connect to DB
mongoose.connect(Mongo_URL)
  .then(() => console.log("✅ Database connected"))
  .catch(err => console.error("❌ Database connection error:", err));

// Static pages
app.get("/", (req, res) => res.render("index"));
app.get("/about", (req, res) => res.render("about"));

// Use routes
app.use("/writers", writerRoutes);
app.use("/contact", contactRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
