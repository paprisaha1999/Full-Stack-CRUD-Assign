const mongoose = require("mongoose");

// notes schema for the document
const noteSchema = mongoose.Schema(
  {
    title: String,
    body: String,
    sub: String,
    userID: String,
  },
  {
    versionKey: false,
  }
);

// notes model for the document
const NoteModel = mongoose.model("note", noteSchema);

module.exports = { NoteModel };
