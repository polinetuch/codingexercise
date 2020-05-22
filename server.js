// Require all dependencies to set up server
var express = require('express');
var logger = require('morgan');
var axios = require('axios');
var cheerio = require('cheerio');

var PORT = 8080;
var app = express();

// Use morgan logger for logging requests
app.use(logger("dev"));

// Parse request body as JSON
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
// Enable security rules for local development
app.use(function(req, res, next) {
    res.header("Allow-Control-Allow-Origin", "");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
})

// Make public a static folder
app.use(express.static("public"));

// Grab the body of the html with axios
var queryURL = 'http://www.mtv.com/news/celebrity/';
var counter = 0;
var findWord = "Demi";

app.get('/getUserInput', function(req, res) {
    var getNames = [
        {
            name: 'Justin'
        }
    ]
    res.send(getNames);
})

app.post('/postUserInput', function(req, res) {
    console.log(req.body);
    res.send('success');
})

// Making a request via axios to the queryURL
axios.get(queryURL).then(function(response) {
    
    // Load HTML into cheerio ans save it to a variable
    var $ = cheerio.load(response.data);

    var scrapedDataArray = [];

    $(".headline").each(function(i, element) {
        
        // Save the formattedElementText of the element in a paragraph variable by finding the a and span tag and trim the value
        var formattedElementText = $(element).find("a").find("span").text().replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
        
        scrapedDataArray.push({formattedElementText});
    });

    // Loop through scraped data array
    for (var i = 0; i < scrapedDataArray.length; i++) {        

        //Format jsonString to remove unncessary and ending characters
        var jsonString = JSON.stringify(scrapedDataArray[i]).substr(25).slice(0, -2);

        // remove quotation marks
        jsonString =  jsonString.replace(/['"]+/g, '' );
        
        var splitObj = jsonString.split(" ");
        // console.log(splitObj);

        for (var item in splitObj) {
            if (splitObj[item] === findWord) {
                counter++; 
                console.log("Name Search: " + splitObj[item] + "\nTotal Found: " + counter);
            }
        }
    }

    }).catch(function(error) {
        console.log("error", error);
        });

// Start the server
app.listen(PORT, function() {
    console.log("App running on port " + PORT);
});