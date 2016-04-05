var http = require('http');

var server = http.createServer(function(req, res) {
  console.log('request!');
  res.body = "hi"
});

server.listen(3000);
