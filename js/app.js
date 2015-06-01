var moment = require('moment');
var _ = require('underscore');

module.exports = {

  rooms: {},

  getRoom: function(roomname) {
    return this.rooms[roomname];
  },

  createMessage : function(message, username) {
    return {
      text: message,
      username: username,
      time: moment()
    };
  },

  createUser : function(username) {
    return {
      username: username,
      messages: []
    };
  },

  // creates a empty room with inital user
  createRoom : function(username, roomname) {
    var users = {};
    users[username] = this.createUser(username);
    return {
      users: users,
      messages: [],
      name: roomname
    };
  },

  roomExists : function(roomname) {
    return _(this.rooms).has(roomname);
  },

  userExistsInRoom : function(room, username) {
    return _(room.users).has(username);
  },

  printState : function() {
    console.log(this.rooms);
  },

  // User actions
  postMessage : function(text, username, roomname) {
    if (!this.roomExists(roomname)) {
      console.log("room " + roomname + " does not exists");
      return;
    }

    var room = this.rooms[roomname];

    if (!this.userExistsInRoom(room, username)) {
      console.log('user ' + username + ' does not exsit in room ' + roomname);
      return;
    }

    var user = room[username];
    var message = this.createMessage(text, username);
    room.messages.push(message);
    return room;
  },

  login : function(username, roomname) {
    console.log(username + " trying to join " + roomname);
    if (this.roomExists(roomname)) {
      var room = this.rooms[roomname];
      var numUsers = _.size(room.users);
      if (numUsers === 1) {
        var user = this.createUser(username);
        room.users[username] = user;
      } else if (numUsers === 0) {
        // deal with it
      } else {
        console.log("cannot have more than two users in a room");
      }
    } else {
      this.rooms[roomname] = this.createRoom(username, roomname);
    }
    return {
      room: this.rooms[roomname],
      username: username
    };
  },

  getState: function() {
    return {
      rooms: this.rooms
    };
  },

  clearState: function() {
    this.rooms = {};
  }

};
