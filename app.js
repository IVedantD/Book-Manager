const express = require('express');
const app = express();
const path = require('path');
const bookModel = require('./models/book'); // Change from userModel to bookModel

app.set('view engine', 'ejs'); // Set EJS as the view engine
app.set('views', path.join(__dirname, 'views')); // Set the directory for views

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Home route
app.get('/', (req, res) => {
    res.render("index"); // Renders views/index.ejs
});

// Read books
app.get('/books', async (req, res) => {
    const books = await bookModel.find();
    res.render("books", { books }); 
});

// Edit book
app.get('/edit/:bookid', async (req, res) => {
    const book = await bookModel.findOne({ _id: req.params.bookid });
    res.render("edit", { book });
});

// Update book
app.post('/update/:bookid', async (req, res) => {
    const { title, author, genre, image, publishedYear } = req.body;
    await bookModel.findOneAndUpdate(
        { _id: req.params.bookid },
        { title, author, genre, image, publishedYear },
        { new: true }
    );
    res.redirect("/books");
});

// Delete book
app.get('/delete/:id', async (req, res) => {
    await bookModel.findOneAndDelete({ _id: req.params.id });
    res.redirect("/books"); 
});

// Create book
app.post('/create', async (req, res) => {
    const { title, author, genre, image, publishedYear } = req.body;

    try {
        await bookModel.create({
            title,
            author,
            genre,
            image,
            publishedYear,
        });
        res.redirect("/books");
    } catch (err) {
        console.error('Error creating book:', err);
        res.status(500).send('An error occurred while creating the book.');
    }
});

app.listen(3000, () => console.log('Server is running on port 3000'));
