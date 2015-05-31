var socket = io();
var events = require('../events.js');

module.exports = {

  addMessage: function(message) {
    this.dispatch('submitMessage', {message: message});
  }

};
