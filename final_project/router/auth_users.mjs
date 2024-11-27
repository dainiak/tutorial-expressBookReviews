import express from 'express';
import jwt from 'jsonwebtoken';
import books from './booksdb.mjs';

export const authenticated_users_router = express.Router();
export const users = [];

export const isValid = (username) => {
    // Username should be at least 3 characters long and not already taken
    return username && username.length >= 3 && !users.find(user => user.username === username);
};

export const authenticatedUser = (username, password) => {
    // Find user and check if password matches
    const user = users.find(user => user.username === username);
    return user && user.password === password;
};

// Login
authenticated_users_router.post("/login", (req, res) => {
    const {username, password} = req.body;

    if (!username || !password) {
        return res.status(400).json({message: "Username and password are required"});
    }

    if (authenticatedUser(username, password)) {
        const token = jwt.sign({username}, 'your-secret-key', {expiresIn: '1h'});
        req.session.user = username;
        return res.status(200).json({token, message: "Login successful"});
    }

    return res.status(401).json({message: "Invalid credentials"});
});

// Add a book review
authenticated_users_router.put("/auth/review/:isbn", (req, res) => {
    const isbn = req.params.isbn;
    const {review} = req.body;
    const username = req.session.user;

    if (!books[isbn]) {
        return res.status(404).json({message: "Book not found"});
    }

    if (!review) {
        return res.status(400).json({message: "Review is required"});
    }

    books[isbn].reviews[username] = review;
    return res.status(200).json({message: "Review added successfully"});
});

authenticated_users_router.delete("/auth/review/:isbn", (req, res) => {
    const isbn = req.params.isbn;
    const {review} = req.body;
    const username = req.session.user;

    if (!books[isbn]) {
        return res.status(404).json({message: "Book not found"});
    }

    if (!books[isbn].reviews[username]) {
        return res.status(400).json({message: "There was no review to delete"});
    }

    delete books[isbn].reviews[username];
    return res.status(200).json({message: "Review deleted successfully"});
});
