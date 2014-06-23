var http = require("http")
   ,fs = require("fs")
   ,path = require("path")
   ,mime = require("mime")
   ,router = require("./router")
   ,socketio = require("socket.io")
   ,chatServer = require("./chat_server");
   
   

  
var server = http.createServer(function(request, response) {
  router.route(request, response);
})


server.listen(3000);

chatServer.listen(server);