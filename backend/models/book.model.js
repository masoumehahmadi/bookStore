const mongoose = require("mongoose");
const validator = require("validator"); // For ISBN validation

// Define book schema
const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please add a book title"],
    trim: true,
    maxlength: [50, "Title cannot be more than 50 characters"],
  },
  author: {
    type: String,
    required: [true, "Please add an author"],
  },
  publicationYear: {
    type: Number,
    min: [1000, "Publication year should be 4 digits"],
    max: new Date().getFullYear(), // Assuming you want to set the max year to the current year
  },
  isbn: {
    // Optional if you want to include ISBN
    type: String,
    unique: true,
  },
});

module.exports = mongoose.model("Book", bookSchema);
