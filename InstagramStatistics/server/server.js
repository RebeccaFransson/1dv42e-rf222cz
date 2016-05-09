"use strict";
var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var path = require("path");

//controllers
var userController = require("./controllers/usersController");

//Express request pipeline
var app = express();
app.use(express.static(path.join(__dirname, "../app/dist")));
app.use(bodyParser.json())
app.use("/", userController);

app.listen(27017, function () {
    console.log("Started listening on port", 27017);
});

// Connect to mongodb database
mongoose.connect("mongodb://localhost/");
