$(document).ready(function() {
  var socket = io.connect();
  var chat = new ChatApp.Chat(socket);
  
  $('.message-form').on('submit', function(event) {
    event.preventDefault();
    var message = $("#message").val();
    $("#message").val("");
    chat.sendMessage(message);
  });
  
  chat.socket.on('broadcast', function(data) {
    $li = $("<li></li>").text(data.text);
    $(".chat").append($li);
  });
  
  
})
  


