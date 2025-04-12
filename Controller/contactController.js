const Contact=require("../models/Contact");


const getFormContact=(req, res) => {
  res.render("contact");
}

const createContact=async (req, res) => {
  const { name, email, message } = req.body;
  try {
    const contact = new Contact({ name, email, message });
    await contact.save();
    req.flash("success", "New Contact Created successfully");
    res.redirect("/contact/show");
  } catch (err) {
    console.error(" Error saving contact:", err);
    req.flash("error", "Something went wrong. Please try again.");
    res.redirect("/contact");
  }
}

const showContact=async (req, res) => {
  try {
    const contact = await Contact.find();
    res.render("showcontact", { contact });
  } catch (err) {
    console.log(err);
  }
}
const destroyContact=async (req, res) => {
  const { id } = req.params;
  try {
    await Contact.findByIdAndDelete(id);
    req.flash("success", "Contact deleted successfully");
    res.redirect("/contact/show");
  } catch (err) {
    console.log(err);
  }
}

module.exports={getFormContact,createContact,showContact,destroyContact}
