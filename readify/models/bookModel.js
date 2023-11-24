const mongoose = require("mongoose");

const bookSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please enter a book title"],
    },
    author: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
    },
    publicationYear: {
      type: Number,
      required: true,
    },
    coverImage: {
      type: String,
    },
  },
  {
    timestamp: true,
  }
);
const Book = mongoose.model("Book", bookSchema);
module.exports = Book;
