var _ = require('underscore');
var app = require('../js/app.js');

describe('app', function() {
  beforeEach(function() {
    app.clearState();
  });

  it('is defined', function() {
    expect(app).toBeDefined();
  });

  it('has state', function() {
    var state = app.getState();
    expect(state).toBeDefined();
  });

  it('can clear it\'s state', function() {
    app.rooms.SHOULDNOTBEHERE = {};
    expect(_.isEmpty(app.rooms)).toBe(false);
    app.clearState();
    expect(_.isEmpty(app.rooms)).toBe(true);
  });

  it('can login', function() {
    var response = app.login('steve', 'room2');
    var room = response.room;
    var username = response.username;
    expect(_.has(app.rooms, 'room2')).toBe(true);
    expect(room.name).toBe("room2");
    expect(username).toBe('steve');
  });

  it('doesn\' allow more than two people in a room', function() {
    var roomname = 'some room';
    app.login('person1', roomname);
    app.login('person2', roomname);
    app.login('person3', roomname);
    expect(_.size(app.rooms[roomname].users)).toBe(2);
  });

  it('can post a message', function() {
    var text = "hey buddy";
    var username = "dtronic";
    var roomname = "room";
    app.login(username, roomname);

    var room = app.postMessage(text, username, roomname);
    var message = _.first(room.messages);
    expect(message.text).toBe(text);
    expect(_.size(room.messages)).toBe(1);
  });


});

