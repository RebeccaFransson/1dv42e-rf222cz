var express = require("express");
var path = require("path");

var app = express();
app.use(express.static(path.join(__dirname,"../app/dist")));
//app.use(express.static('app'));
console.log('hej på server');
app.get("/", function(req, res) {
  //res.sendFile('index.html');
})

app.listen(7777,function(){
    console.log("Started listening on port", 7777);
})
