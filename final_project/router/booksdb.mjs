export const books = {
    1: {"author": "Chinua Achebe", "title": "Things Fall Apart", "reviews": {}},
    2: {"author": "Hans Christian Andersen", "title": "Fairy tales", "reviews": {}},
    3: {"author": "Dante Alighieri", "title": "The Divine Comedy", "reviews": {"John Doe": "Nice book! A bit outdated though..."}},
    4: {"author": "Unknown", "title": "The Epic Of Gilgamesh", "reviews": {}},
    5: {"author": "Unknown", "title": "The Book Of Job", "reviews": {}},
    6: {"author": "Unknown", "title": "One Thousand and One Nights", "reviews": {}},
    7: {"author": "Unknown", "title": "Nj\u00e1l's Saga", "reviews": {}},
    8: {"author": "Jane Austen", "title": "Pride and Prejudice", "reviews": {}},
    9: {"author": "Honor\u00e9 de Balzac", "title": "Le P\u00e8re Goriot", "reviews": {}},
    10: {"author": "Samuel Beckett", "title": "Molloy, Malone Dies, The Unnamable, the trilogy", "reviews": {}}
};


// Simulate database operations with delays
const simulateDbDelay = () => new Promise(resolve => setTimeout(resolve, 500));

export const findBookById = async (isbn) => {
    await simulateDbDelay();
    return books[isbn];
};

export const findBooksByAuthor = async (author) => {
    await simulateDbDelay();
    return Object.values(books).filter(
        book => book.author.toLowerCase() === author.toLowerCase()
    );
};

export const findBooksByTitle = async (searchTitle) => {
    await simulateDbDelay();
    return Object.values(books).filter(
        book => book.title.toLowerCase().includes(searchTitle.toLowerCase())
    );
};

export const getAllBooks = async () => {
    await simulateDbDelay();
    return books;
};
