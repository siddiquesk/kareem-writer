const Writer = require("../models/writer");

// ===============================
// Get all writers - Fetch and render all writers
// ===============================
const getWriters = async (req, res) => {
  try {
    const writers = await Writer.find();  // Fetch writers from the database
    res.render("writers", { writers });  // Render the writers page with fetched data
  } catch (err) {
    res.status(500).send("Something went wrong");  // Respond with error message if something goes wrong
  }
};

// ===============================
// Display form to create new writer
// ===============================
const createWritersForm = (req, res) => {
  res.render("new.ejs");  // Render the 'new writer' form page
};

// ===============================
// Create new writer - Save new writer in the database
// ===============================
const createWriter = async (req, res) => {
  const { name, description, category, contact } = req.body;

  try {
    const url = req.file?.path;  // Extract file URL
    const filename = req.file?.filename;  // Extract file filename

    const newWriter = new Writer({
      name,
      description,
      category,
      contact,
      image: { url, filename }
    });

    await newWriter.save();  // Save the new writer to the database
    req.flash("success", "New Writer Created successfully");
    res.redirect("/writers");  // Redirect to writers page after success

  } catch (err) {
    req.flash("error", "Something went wrong while saving writer");
    res.redirect("/writers");  // Redirect back if there is an error
  }
};

// ===============================
// Delete writer - Remove a writer from the database
// ===============================
const destroyWriter = async (req, res) => {
  const { id } = req.params;  // Extract writer ID from request parameters

  try {
    await Writer.findByIdAndDelete(id);  // Delete the writer by ID
    req.flash("success", "Writer Deleted successfully");
    res.redirect("/writers");  // Redirect to writers page after successful deletion

  } catch (err) {
    req.flash("error", "Failed to delete writer");  // Flash error message if deletion fails
    res.redirect("/writers");  // Redirect back to the writers page
  }
};

// Export the controller functions for use in routes
module.exports = { 
  getWriters, 
  createWritersForm, 
  createWriter, 
  destroyWriter 
};




