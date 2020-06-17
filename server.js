const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const axios = require('axios');
const cors = require('cors');
const cheerio = require('cheerio');
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors())
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // disabled for security on local
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
});
app.use(express.static(path.join(__dirname, 'public')));

// console.log that your server is up and running
app.listen(port, () => console.log("http://localhost:" + port));

app.use('/search', async (req, res) => {
    var axiosResponse = await axios.get("http://www.mtv.com/news/celebrity/");
    var $ = await cheerio.load(axiosResponse.data);
    var scrapedDataArray = [];
    
    $(".headline").each(function(i, element) {
        var formattedElementText = $(element).find("a").find("span").text().replace(/(\r\n|\n|\r|\t|\s|""+)/gm, " ").trim();
        var jsonString = JSON.stringify(formattedElementText);
        jsonString = jsonString.replace(/[""]+/g, '' ).split(" ");
        scrapedDataArray.push(jsonString);
    });

    // Merge nested array into one
    var mergeNestedArray = [].concat.apply([], scrapedDataArray);
      res.status(200).send(mergeNestedArray);
})

// create a GET route
app.use('/', (req, res) => {
  res.send("THE MAIN PAGE");
});