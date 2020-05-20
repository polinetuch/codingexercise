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