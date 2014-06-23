var socketio = require("socket.io");


var listen = function(server) {
  var chats = new ChatServer(server);
  chats.bindings();
};

var ChatServer = function(server) {
  this.guestNumber = 0;
  this.nicknames = {};
  this.currentRooms = {};
  
  this.io = socketio.listen(server);
};
  
ChatServer.prototype.bindings = function() {
  var guestNumber = this.guestNumber;
  var nicknames = this.nicknames;
  var currentRooms = this.currentRooms;
  var io = this.io;
  var that = this;

  io.sockets.on('connection', function(socket) {
    console.log("socket connected");

    nicknames[socket.id] = "guest" + guestNumber++;
    socket.emit('nicknameChangeResult', nicknames[socket.id]);
    that.joinRoom(socket, 'Lobby');

    socket.on('message', function(data) {
      data.username = nicknames[socket.id];
      io.sockets.in(currentRooms[socket.id]).emit('broadcast', data);
    });

    socket.on('nicknameChangeRequest', function(data) {

      if(that.validNickname(data)) {
        socket.emit('nicknameChangeResult', {text: "Your username has changed to " + data });
        nicknames[socket.id] = data;
      } else {
        socket.emit('nicknameChangeResult', {
          success: false,
          message: 'Not a valid nickname.'
        });
      }
    });
    
    socket.on('roomChangeRequest', function(data) {
      that.joinRoom(socket, data);
    });
    

    socket.on('disconnect', function() {
      var name = nicknames[socket.id];
      delete nicknames[socket.id];
      delete currentRooms[socket.id];
      io.sockets.emit('broadcast', {
        username: "Notice",
        text: name + " has disconnected."})
    })
  });
}


ChatServer.prototype.validNickname = function(data) {
  if(data.substring(0, 5).toLowerCase() === "guest") {
    return false;
  }
  for(var key in this.nicknames) {
    if(this.nicknames[key] === data) {
      return false;
    }
  }
  return true;
}

ChatServer.prototype.joinRoom = function(socket, newRoom) {
  var io = this.io;
  var oldRoom = this.currentRooms[socket.id]
  if (oldRoom) {
    io.sockets.in(oldRoom).emit('broadcast', {
      username: "Notice",
      text: this.nicknames[socket.id] + " has left " + oldRoom})
    socket.leave(oldRoom);
  } 
  
  socket.join(newRoom);
  this.currentRooms[socket.id] = newRoom;
  io.sockets.in(newRoom).emit('broadcast', {
    username: "Notice",
    text: this.nicknames[socket.id] + " has joined " + newRoom})
}

exports.listen = listen;