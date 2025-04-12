const Contact = require("../models/Contact");

// ===============================
// Display Contact Form
// ===============================
const getFormContact = (req, res) => {
  // Render the contact form page
  res.render("contact");
};

// ===============================
// Handle Contact Form Submission
// ===============================
const createContact = async (req, res) => {
  const { name, email, message } = req.body;
  
  try {
    // Create a new contact instance with the submitted data
    const contact = new Contact({ name, email, message });

    // Save the new contact in the database
    await contact.save();

    // Flash success message and redirect to the contact list page
    req.flash("success", "New Contact Created successfully");
    res.redirect("/contact/show");

  } catch (err) {
    // Handle any errors during saving the contact
    console.error("Error saving contact:", err);
    req.flash("error", "Something went wrong. Please try again.");
    res.redirect("/contact"); // Redirect back to the contact form
  }
};

// ===============================
// Show All Contacts
// ===============================
const showContact = async (req, res) => {
  try {
    // Fetch all contacts from the database
    const contact = await Contact.find();

    // Render the show contact page and pass the contacts data
    res.render("showcontact", { contact });

  } catch (err) {
    // Log any errors that occur while fetching the contacts
    console.log(err);
  }
};

// ===============================
// Delete Contact
// ===============================
const destroyContact = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the contact by ID and delete it from the database
    await Contact.findByIdAndDelete(id);

    // Flash success message and redirect to the show contacts page
    req.flash("success", "Contact deleted successfully");
    res.redirect("/contact/show");

  } catch (err) {
    // Log any errors during deletion
    console.log(err);
  }
};

// Export controller functions
module.exports = { 
  getFormContact, 
  createContact, 
  showContact, 
  destroyContact 
};

