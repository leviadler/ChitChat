(function(root){
  var ChatApp = root.ChatApp = (root.ChatApp || {});
  
  var Chat = ChatApp.Chat = function(socket) {
    this.socket = socket;
  };
  
  Chat.prototype.sendMessage = function(message) {
    this.socket.emit("message", {text: message} );
  };
  
  Chat.prototype.processCommand = function(command, args) {
    if(command === "/nick") {
      this.socket.emit("nicknameChangeRequest", args);
    } else {
      alert("command not recognized!");
    }
  };


})(this); 