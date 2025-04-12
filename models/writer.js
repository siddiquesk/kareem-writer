// models/Writer.js

const mongoose = require('mongoose');

const writerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    url:String,
    filename:String,
  },
  description: {
    type: String,
  },
  category: {
    type: String,
    default: "Writer",
  },
  contact: {
    type: String,
    required: false,
  },
}, {
  timestamps: true
});

const Writer= mongoose.model('Writer', writerSchema);
module.exports=Writer;
