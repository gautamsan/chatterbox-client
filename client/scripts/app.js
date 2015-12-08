var app = {};
app.server = 'https://api.parse.com/1/classes/chatterbox' //used for all requests
app.messages = [];

app.init = function() {
  // app.addMessage({
  //   username: 'Mel Brooks',
  //   text: 'Never underestimate the power of the Schwartz!',
  //   roomname: 'lobby',
  //   updatedAt: "2015-09-01T01:00:42.028Z"
  // });
  // //app.clearMessages();


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
};

app.fetch = function(callback) {
  $.ajax({
    url: app.server + "?order=-createdAt",
    type: 'GET',
    contentType: 'application/json',
    success: function (data) {
      if(callback) {
        callback(data);
      }
      console.log('chatterbox: Message received. Data: ', data);
    },
    error: function (data) {
      console.error('chatterbox: Failed to receive message. Error: ', data);
    }
  });
};

app.clearMessages = function() {
  $('#chats').html('');
};

app.addMessage = function(message) {
  var $chats = $('#chats');
  var newChat = message.text;
  $chats.append('<div><a class="username" href="#">' + message.username + '</a>' + newChat + '</div>');
};

app.addRoom = function(roomName) {
  $('#roomSelect').append($('<option>'+ roomName +'</option>'))
};

app.addFriend = function (friend) {

};

app.handleSubmit = function (message) {
  console.log(message);
};

app.getMessages = function(roomName) {
  app.fetch(function(data) {
    app.clearMessages();
    //app.messages = app.messages.concat(data.results);
    data.results.forEach(app.addMessage);
  })
}

$(document).ready(function(){
  app.init();

  $('#main').on('click', '.username', function(e) {
    app.addFriend(e.target.innerHTML);
  });

  $('#send').on('submit', function(e){
    app.handleSubmit( $('#message').val() );
    e.preventDefault();
  });
  app.getMessages();
  setInterval(function() {
    app.getMessages();
  }, 5000);

});
