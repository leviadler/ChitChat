$(document).ready(function() {
  var socket = io.connect();
  var chat = new ChatApp.Chat(socket);
  
  $('.message-form').on('submit', function(event) {
    event.preventDefault();
    var message = $("#message").val();
    $("#message").val("");
    if(message.substring(0, 1) === "/") {
      var args = message.split(" ");
      chat.processCommand(args[0], args[1]);
    } else {
      chat.sendMessage(message);
    }
  });
  
  chat.socket.on('broadcast', function(data) {
    $li = $("<li></li>").text(data.username + ": " + data.text);
    $(".chat").append($li);
  });
  
  chat.socket.on("nicknameChangeResult", function(data) {
    $li = $("<li></li>").text(data.text);
    $(".chat").append($li);
  })
  
  
})
  


