// Package Imports
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");

const Blog = require('./models/Blog');

// Express App
const app = express();

// MongoDB
const dbURI = ""; // Removed because I'd prefer not to post access to the DB to GitHub
mongoose.connect(dbURI)
    .then(() => {
        app.listen(3000, () => {
            console.log("Server started on port 3000.")
        });
    })
    .catch(error => console.error(error));

// Register view engine
app.set('view engine', 'ejs');

// Middleware & Static Files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Routes
app.get('/', (req, res) => {
    res.redirect('/blogs');
});

app.get('/about', (req, res) => {
    res.render('about', { title: "About" });
});

// Blog Routes
app.get('/blogs/create', (req, res) => {
    res.render('create', { title: "Create Blog" });
});

app.get('/blogs', (req, res) => {
    Blog.find().sort({ createdAt: -1 })
        .then(result => {
            res.render('index', {title: 'All Blogs', blogs: result});
        })
        .catch(err => console.error(err));
});

app.post('/blogs', (req, res) => {
    const blog = new Blog(req.body);

    blog.save()
        .then(() => res.redirect('/'))
        .catch(err => console.error(err));
});

app.get('/blogs/:id', (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
        .then(result => {
            res.render('details', {title: 'Blog Details', blog: result});
        })
        .catch(err => console.error(err));
});

app.delete('/blogs/:id', (req, res) => {
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
        .then(result => {
            res.json({ redirect: '/blogs' });
        })
        .catch(err => console.error(err));
});

// 404
app.use((req, res) => {
    res.status(404).render('404', { title: "404" });
});