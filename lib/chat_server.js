var socketio = require("socket.io");



var listen = function(server) {
  var io = socketio.listen(server);
  io.sockets.on('connection', function(socket) {
    console.log("working!!!!");
    
    socket.on('message', function(data) {
      console.log(data);
      io.sockets.emit('broadcast', data);
    })
  });
}

exports.listen = listen;