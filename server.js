const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Setup MySQL connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Database0907-',
    database: 'book_management'
});

// Root route
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// Serve static files
app.use(express.static('public'));

// Form submission to add a book
app.post('/books/add', (req, res) => {
    const bookName = req.body.bookName;

    const sql = 'INSERT INTO books (bookName) VALUES (?)';
    connection.query(sql, [bookName], (err, result) => {
        if (err) {
            console.error('Error adding book:', err);
            return res.status(500).send('Internal Server Error');
        }
        console.log('Book added successfully:', result);
        res.redirect('/');
    });
});

// Retrieve all books
app.get('/books', (req, res) => {
    const sql = 'SELECT * FROM books';
    connection.query(sql, (err, rows) => {
        if (err) {
            console.error('Error retrieving books:', err);
            return res.status(500).send('Internal Server Error');
        }
        console.log('Books retrieved successfully:', rows);
        res.json(rows);
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
