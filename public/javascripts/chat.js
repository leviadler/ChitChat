(function(root){
  var Chat = root.Chat = (root.Chat || {});
  
  var sendMessage = Chat.sendMessage = function(message) {
    io.sockets.emit("message", {text: message} );
  }


})(this); 