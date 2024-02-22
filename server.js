const express = require("express");
const bodyParser = require("body-parser");

const mysql = require("mysql2");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(bodyParser.json());

let connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Database0907-",
    database: "book_management",
    port: 3306,
});


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.post('/books/add', (req, res) => {
    const bookName = req.body.bookName;

    const sql = 'INSERT INTO books (name) VALUES (?)';
    const values = [bookName];
    connection.query(sql, values, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Internal Server Error');
        } else {
            console.log('Book added successfully');
            res.redirect('/');
        }
    });
});


app.get('/books', (req, res) => {
    const sql = 'SELECT * FROM books';
    connection.query(sql, (err, rows) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        } else {
            console.log('Books retrieved successfully');
            console.log(rows)
            return res.json(rows);
        }
    });
});

app.listen(3000, function () {
    console.log("runs at port 3000");
});