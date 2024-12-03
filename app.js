// Package Imports
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");

// Routing Imports
const blogRoutes = require('./routes/blogRoutes');

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
app.use('/blogs', blogRoutes);

// 404
app.use((req, res) => {
    res.status(404).render('404', { title: "404" });
});