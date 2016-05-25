"use strict";
var express = require("express");
var bodyParser = require("body-parser")
var mongoose = require("mongoose");

var path = require("path");

//controllers
var userController = require("./controllers/usersController");

//Express request pipeline
var app = express();
app.use(express.static(path.join(__dirname, "../app/dist")));
app.use(bodyParser.json())
app.use("/", userController);


app.listen(8080, function () {
    console.log("Started listening on port", 8080);
});

var mongoURI = "mongodb://188.166.116.158:27017/test";
var MongoDB = mongoose.connect(mongoURI).connection;
MongoDB.on('error', function(err) { console.log(err.message); });
MongoDB.once('open', function() {
  console.log("mongodb connection open");
});
// Connect to mongodb database
/*mongoose.connect("mongodb://localhost:27017/instagramStatisticsDb");
var db = mongoose.connection;
//On error
    db.on("error", err => {
      console.log(err);
        console.log("There's been a mistake!");
    });

    //On open
    db.once("open", () => {
        console.log("We need shishkebab to table 42!");
    });

    //When shut down
    process.on("SIGINT", () => {
        db.close(() => {
            console.log("The server turned to smush!");
            process.exit(0);
        });
    });
*/
