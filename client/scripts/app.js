var app = {};
app.server = 'https://api.parse.com/1/classes/chatterbox' //used for all requests
app.messages = [];
app.intervalID;
app.stop = function () { clearInterval(app.intervalID) };
app.init = function() {

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

app.fetch = function(callback, queryString) {
  queryString = queryString || '';
  $.ajax({
    url: app.server + queryString,
    type: 'GET',
    contentType: 'application/json',
    success: function (data) {
      if(callback) {
        callback(data);
      }
      //console.log('chatterbox: Message received. Data: ', data);
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
  var newChat = String( message.text );
  $chats.append('<div><a class="username" href="#">' + message.username + '</a>' + newChat + '</div>');
};

app.addRoom = function(roomName) {
  $('#roomSelect').append($('<option>'+ roomName +'</option>'))
};

app.addFriend = function (friend) {

};

app.escapeCharacters = function(text) {
  //prevent some XSS attack
  text = text.replace(/[<>']+/g, '');
  return text;
};

app.handleSubmit = function (messageText) {
  var message = {
    username: app.escapeCharacters(window.location.search.slice(10)),
    text: app.escapeCharacters(messageText),
    roomName: 'lobby'
  };
  console.log(messageText);
  app.send(message);
};

app.getMessages = function(roomName) {
  app.fetch(function(data) {
    app.clearMessages();
    //app.messages = app.messages.concat(data.results);
    data.results.forEach(app.addMessage);
  }, "?order=-createdAt")
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
  app.intervalID = setInterval(function() {
    app.getMessages();
  }, 5000);

});
