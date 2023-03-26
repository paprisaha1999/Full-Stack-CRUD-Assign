const mongoose = require("mongoose");

// users schema for the document
const usersSchema = mongoose.Schema(
  {
    email: String,
    pass: String,
    location: String,
    age: Number,
  },
  {
    versionKey: false,
  }
);

// users model for the document
const UserModel = mongoose.model("user", usersSchema);

module.exports = { UserModel };
