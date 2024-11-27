import express from 'express';
import {getAllBooks, findBookById, findBooksByAuthor, findBooksByTitle} from './booksdb.mjs';
import {isValid, users} from './auth_users.mjs';

export const general_router = express.Router();

// Register new user
general_router.post("/register", (req, res) => {
    const {username, password} = req.body;

    if (!username || !password) {
        return res.status(400).json({message: "Username and password are required"});
    }

    if (!isValid(username)) {
        return res.status(400).json({message: "Username is invalid or already taken"});
    }

    users.push({username, password});
    return res.status(201).json({message: "User registered successfully"});
});


// Get the book list available in the shop
general_router.get('/', async (req, res) => {
    try {
        const allBooks = await getAllBooks();
        res.status(200).json(allBooks);
    } catch (error) {
        res.status(500).json({
            message: "Error retrieving books", error: error.message
        });
    }
});

// Get book details based on ISBN
general_router.get('/isbn/:isbn', async (req, res) => {
    try {
        const isbn = req.params.isbn;
        const book = await findBookById(isbn);

        if (!book) {
            return res.status(404).json({message: "Book not found"});
        }

        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({
            message: "Error retrieving book", error: error.message
        });
    }
});

// Get book details based on author
general_router.get('/author/:author', async (req, res) => {
    try {
        const author = req.params.author;
        const authorBooks = await findBooksByAuthor(author);

        if (authorBooks.length === 0) {
            return res.status(404).json({message: "No books found for this author"});
        }

        res.status(200).json(authorBooks);
    } catch (error) {
        res.status(500).json({
            message: "Error retrieving books by author", error: error.message
        });
    }
});

// Get all books based on title
general_router.get('/title/:title', async (req, res) => {
    try {
        const title = req.params.title;
        const matchingBooks = await findBooksByTitle(title);

        if (matchingBooks.length === 0) {
            return res.status(404).json({message: "No books found with this title"});
        }

        res.status(200).json(matchingBooks);
    } catch (error) {
        res.status(500).json({
            message: "Error retrieving books by title", error: error.message
        });
    }
});

// Get book review
general_router.get('/review/:isbn', (req, res) => {
    const isbn = req.params.isbn;
    const book = books[isbn];

    if (!book) {
        return res.status(404).json({message: "Book not found"});
    }

    return res.status(200).json({
        reviews: book.reviews,
        count: Object.keys(book.reviews).length
    });
});