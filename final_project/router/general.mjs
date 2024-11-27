import express from 'express';
import books from './booksdb.mjs';
import {isValid, users} from './auth_users.mjs';

export const general_router = express.Router();

general_router.get("/", (req, res) => {
    res.status(200).json(books);
});

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

// Get book details based on ISBN
general_router.get('/isbn/:isbn', (req, res) => {
    const isbn = req.params.isbn;
    const book = books[isbn];

    if (!book) {
        return res.status(404).json({message: "Book not found"});
    }

    return res.status(200).json(book);
});

// Get book details based on author
general_router.get('/author/:author', (req, res) => {
    const author = req.params.author;
    const authorBooks = Object.values(books).filter(
        book => book.author.toLowerCase() === author.toLowerCase()
    );

    if (authorBooks.length === 0) {
        return res.status(404).json({message: "No books found for this author"});
    }

    return res.status(200).json(authorBooks);
});

// Get all books based on title
general_router.get('/title/:title', (req, res) => {
    const title = req.params.title.toLowerCase();
    const matchingBooks = Object.values(books).filter(
        book => book.title.toLowerCase().includes(title)
    );

    if (matchingBooks.length === 0) {
        return res.status(404).json({message: "No books found with this title"});
    }

    return res.status(200).json(matchingBooks);
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