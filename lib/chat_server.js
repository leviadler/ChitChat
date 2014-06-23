var socketio = require("socket.io");

var guestNumber = 0;
var nicknames = {};



var listen = function(server) {
  var io = socketio.listen(server);
  io.sockets.on('connection', function(socket) {
    
    nicknames[socket.id] = "guest" + guestNumber++;
    socket.emit('nicknameChangeResult', nicknames[socket.id]);

    socket.on('message', function(data) {
      data.username = nicknames[socket.id];
      io.sockets.emit('broadcast', data);
    });
    
    socket.on('nicknameChangeRequest', function(data) {
      
      if(validNickname(data)) {
        socket.emit('nicknameChangeResult', {text: "Your username has changed to " + data });
        nicknames[socket.id] = data;
      } else {
        socket.emit('nicknameChangeResult', {
          success: false,
          message: 'Not a valid nickname.'
        });
      }
    })
    
    socket.on('disconnect', function() {
      var name = nicknames[socket.id];
      delete nicknames[socket.id];
      io.sockets.emit('broadcast', {text: name + " has left the room"})
    })
  });
}


var validNickname = function(data) {
  if(data.substring(0, 5).toLowerCase() === "guest") {
    return false;
  }
  for(var key in nicknames) {
    if(nicknames[key] === data) {
      return false;
    }
  }
  return true;
}

exports.listen = listen;