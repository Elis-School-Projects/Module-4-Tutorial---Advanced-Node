// Package Imports
const express = require("express");
const morgan = require("morgan");

// Express App
const app = express();

// Register view engine
app.set('view engine', 'ejs');

app.listen(3000, () => {
    console.log("Server started on port 3000.")
});

app.use(express.static('public'));
app.use(morgan('dev'));

app.get('/', (req, res) => {
    const blogs = [
        {title: "Blog Number 1", snippet: "Lorem ipsum dolor sit amet consectetur adipisicing elit."},
        {title: "Best Blog Number 2", snippet: "Lorem ipsum dolor sit amet consectetur adipisicing elit."},
        {title: "Semi Okay Blog Number 3", snippet: "Lorem ipsum dolor sit amet consectetur adipisicing elit."},
    ]

    res.render('index', { title: "Home", blogs });
});

app.get('/about', (req, res) => {
    res.render('about', { title: "About" });
});

app.get('/blogs/create', (req, res) => {
    res.render('create', { title: "Create Blog" });
});

app.use((req, res) => {
    res.status(404).render('404', { title: "404" });
});