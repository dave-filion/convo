var express = require('express');
var server = express();
var http = require('http').Server(server);
var io = require('socket.io')(http);
var events = require('./js/events.js');
var app = require('./js/app.js');
var _ = require('underscore');

server.use(express.static('public'));

server.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
  io.emit(events.USER_CONNECT);

  socket.on(events.SEND_MESSAGE, function(payload) {
    var username = payload.username;
    var message = payload.message;
    var roomname = payload.roomname;

    var room = app.postMessage(message, username, roomname);
    io.emit(events.SEND_MESSAGE, room);
  });

  socket.on(events.ATTEMPT_LOGIN, function(payload) {
    var username = payload.username;
    var roomname = payload.roomname;
    console.log("attempt login user: " + username + " roomname: " + roomname);
    var room = app.login(username, roomname);
    if (_.isUndefined(room)) {
      console.log('login failed');
    }
    io.emit(events.LOGIN_SUCCESS, room);
  });

  socket.on('disconnect', function() {
    console.log('user disconnected');
  });
});

http.listen(3000, function() {
  console.log("server listening");
});
