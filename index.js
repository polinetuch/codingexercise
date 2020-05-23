var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;
var bodyParser = require('body-parser');
var fs = require('fs')
var path = require('path');

const scraper = require('./scraper');

app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // disabled for security on local
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
});
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
    fs.readFile( __dirname + "/" + "index.html", 'utf8', function (err, data) {
        console.log( data );
        res.end( data );
    });
 })	

app.post('/search', async (req, res) => {
    console.log(req.body);
    
    scraper.scrapeWebsite(req.body.word)
    .then(total => res.json(total))
    .catch(err => res.status(400).json('Error: ' + err));
});

app.listen(PORT, function() {
    console.log("App running on port http://localhost:" + PORT);
});