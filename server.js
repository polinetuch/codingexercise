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

// Grab the body of the html with axios
var word = 'customer';
var counter = 0;
var queryURL = 'https://circlein.com/frequently-asked-questions/';    


axios.get(queryURL).then(function(response) {
    
    var $ = cheerio.load(response.data);
    
    $("p span").each(function(i, element) {

        var obj = element.children;
        // console.log("===START===", obj, "===END===")
        
        var newArray = [];

        for (var i = 0; i < obj.length; i++) {

            var foundWords = obj[i].data;
            // console.log("===START===", obj[i].data, "===END===")

            newArray.push(foundWords);
            // console.log("===START===", newArray, "===END===");
        }
    })
    }).catch(function(error) {
        console.log("error", error);
        });

// Start the server
app.listen(PORT, function() {
    console.log("App running on port " + PORT);
})