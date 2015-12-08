var app = {};
app.server = 'https://api.parse.com/1/classes/chatterbox' //used for all requests
app.init = function() {
  // app.addMessage({
  //   username: 'Mel Brooks',
  //   text: 'Never underestimate the power of the Schwartz!',
  //   roomname: 'lobby',
  //   updatedAt: "2015-09-01T01:00:42.028Z"
  // });
  // app.clearMessages();
};

app.send = function(message) {
  $.ajax({
    url: app.server,
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent. Data: ', data);
    },
    error: function (data) {
      console.error('chatterbox: Failed to send message. Error: ', data);
    }
  });
}

app.fetch = function() {
  $.ajax({
    url: app.server,
    type: 'GET',
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message received. Data: ', data);
    },
    error: function (data) {
      console.error('chatterbox: Failed to receive message. Error: ', data);
    }
  });
}

app.clearMessages = function() {
  $('#chats').html('');
}

app.addMessage = function(message) {
  var $chats = $('#chats');
  var newChat = message.text;
  $chats.append('<div>' + newChat + '</div');
}

app.addRoom = function() {
  
}

$(document).ready(function(){
  app.init();
});
