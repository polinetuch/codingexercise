var axios = require('axios');
var cheerio = require('cheerio');

async function scrapeWebsite(findWord) {    
    var counter = 0;

    var axiosResponse = await axios.get("http://www.mtv.com/news/celebrity/");
    var $ = await cheerio.load(axiosResponse.data);
    var scrapedDataArray = [];

    $(".headline").each(function(i, element) {
        var formattedElementText = $(element).find("a").find("span").text().replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
        scrapedDataArray.push({formattedElementText});
    });

    for (var i = 0; i < scrapedDataArray.length; i++) {
        var jsonString = JSON.stringify(scrapedDataArray[i]).substr(25).slice(0, -2); // Format jsonString to remove unncessary and ending characters
        jsonString =  jsonString.replace(/['"]+/g, '' ); // remove quotation marks
        var splitObj = jsonString.split(" ");

        for (var item in splitObj) {
            if (splitObj[item] === findWord) {
                counter++; 
                console.log("Name Search: " + splitObj[item] + "\nTotal Found: " + counter);
            }
        }
    };
    var scraperResponse = {Total: counter};
    return scraperResponse;    
};

module.exports = {
    scrapeWebsite
};