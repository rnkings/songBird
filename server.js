"use strict";

var express = require("express");
var fs = require('file-system');
var app = express();

// ROOT DIRECTORY
app.use('/', express.static(__dirname + '/public'));









app.listen(3002, function () {
  console.log('See this website at localhost:3002');
});