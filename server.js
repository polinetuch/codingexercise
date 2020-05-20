// Require all dependencies to set up server
var express = require('express');
var logger = require('morgan');
var mongoose = require('mongoose');

var axios = require('axios');
var cheerio = require('cheerio');

// Set port number to 8080
var PORT = 8080;

// Initialize express
var app = express();

// Configure middleware

// Use morgan logger for logging requests
app.use(logger("dev"));

// Parse request body as JSON
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

// Make public a static folder
app.use(express.static("public"));

// Connect to the MongoDB
mongoose.connect("mongodb://localhost/codingExercise", { useNewUrlParser: true });

// Start the server
app.listen(PORT, function() {
    console.log("App running on port " + PORT);
})