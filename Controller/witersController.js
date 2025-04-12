const Writer=require("../models/writer");

const getWiters=async (req, res) => {
  try {
    const writers = await Writer.find();
    res.render("writers", { writers });
  } catch (err) {
    console.error("Error fetching writers:", err);
    res.status(500).send("Something went wrong");
  }
}
  
const cretaeWitersForm=(req, res) => {
  res.render("new.ejs");
}

const createAllWriter = async (req, res) => {
  try {
    const { name, description, category, contact } = req.body;
    // 🧠 Yahan file se URL aur filename nikaal raha hai
    const url = req.file?.path;
    const filename = req.file?.filename;
    // 🏗️ New writer with image object
    const newWriter = new Writer({
      name,
      description,
      category,
      contact,
      image: {
        url: url,
        filename: filename
      }
    });

    await newWriter.save();
    req.flash("success", "New Writer Created successfully");
    res.redirect("/writers");

  } catch (err) {
    console.error("❌ Error saving writer:", err);
    req.flash("error", "Something went wrong while saving writer");
    res.redirect("/writers");
  }
};


const destroyWriters=async (req, res) => {
  const { id } = req.params;
  try {
    await Writer.findByIdAndDelete(id);
    req.flash("success", "Writer Deleted successfully");
    res.redirect("/writers");
  } catch (err) {
    console.log(err);
    req.flash("error", "Failed to delete writer");
    res.redirect("/writers");
  }
}



module.exports={getWiters ,cretaeWitersForm,createAllWriter,destroyWriters}


