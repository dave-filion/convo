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
    app.login('steve', 'room2');
    expect(_.has(app.rooms, 'room2')).toBe(true);
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

    var message = app.postMessage(text, username, roomname);
    expect(message.text).toBe(text);
    expect(_.size(app.rooms[roomname].messages)).toBe(1);
  });


});

