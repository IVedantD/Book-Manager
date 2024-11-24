const mongoose = require('mongoose');

// Single connection to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/databaseName', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Database connected successfully'))
  .catch(err => console.log('Database connection error:', err));

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
