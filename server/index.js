var express = require('express')
var app = express()
var port = 3000
var bodyParser = require('body-parser');

const scraper = require('./scraper');

app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // disabled for security on local
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
});

app.post('/search', async (req, res) => {
    console.log(req.body);
    
    scraper.scrapeWebsite(req.body.word)
    .then(total => res.json(total))
    .catch(err => res.status(400).json('Error: ' + err));
});

app.listen(port, function() {
    console.log("App running on port http://localhost:" + port);
});