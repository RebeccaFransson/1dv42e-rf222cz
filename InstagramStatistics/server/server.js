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
app.use(bodyParser.json());
app.use("/", userController);

app.listen(8080, function () {
    console.log("Started listening on port", 8080);
});

//connectar till min mongo-db
var mongoURI = "mongodb://188.166.116.158:27017/ISDb";
var MongoDB = mongoose.connect(mongoURI).connection;
MongoDB.on('error', function(err) { console.log(err.message); });
MongoDB.once('open', function() {
  console.log("mongodb connection open");

  var rule = new schedule.RecurrenceRule();
  //Detta kommer ändras till en gång i veckan senare.
  //Men behåller en gång i veckan för att funktionalliteten lätt kan vises
  rule.hour = 11;//varje dag kl 12 på dagen
  rule.minute = 59;//varje dag kl 12 på dagen
  schedule.scheduleJob(rule, function(){
      console.log(new Date());
      console.log('---Updating folloing people:---');
      updateUsersController.checkForUpdate();
  });
});
