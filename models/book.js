const mongoose = require('mongoose');


// Define the book schema
const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: { type: String, required: true },
  image: { type: String, required: true },
  publishedYear: { type: Number, required: true },
});

// Create the book model
const bookModel = mongoose.model('Book', bookSchema);

// Export the model
module.exports = bookModel;
