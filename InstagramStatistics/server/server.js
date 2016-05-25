"use strict";
var express = require("express");
var bodyParser = require("body-parser")
var mongoose = require("mongoose");
var schedule = require('node-schedule');

var path = require("path");

//controllers
var userController = require("./controllers/usersController");
var updateUsersController = require("./controllers/updateUsersController");

//Express request pipeline
var app = express();
app.use(express.static(path.join(__dirname, "../app/dist")));
app.use(bodyParser.json())
/*app.use("/", function(req, res){
  console.log(userController);
  userController.getSavedStats(req, res);
});*/
app.use("/", userController);

app.listen(8080, function () {
    console.log("Started listening on port", 8080);
});

//connectar till min mongo-db
var mongoURI = "mongodb://188.166.116.158:27017/InstagramStatisticsDb";
var MongoDB = mongoose.connect(mongoURI).connection;
MongoDB.on('error', function(err) { console.log(err.message); });
MongoDB.once('open', function() {
  console.log("mongodb connection open");
  updateUsersController.checkForUpdate();
});

/*var rule = new schedule.RecurrenceRule();

rule.second = 30;

schedule.scheduleJob(rule, function(){
    console.log(new Date());
    console.log('Today is recognized by Rebecca Black!---------------------------');
});*/
