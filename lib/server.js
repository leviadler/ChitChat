var http = require("http")
   ,fs = require("fs")
   ,path = require("path")
   ,mime = require("mime")
   ,router = require("./router");
   
   
   
var server = http.createServer(function(request, response) {
  router.route(request, response);
})


server.listen(3000);