var Fluxxor = require('fluxxor');

module.exports = Fluxxor.createStore({

  initialize: function() {
    this.messages = [];
    this.bindActions(
      "submitMessage" , this.onSubmitMessage
    );
  },

  onSubmitMessage: function(payload) {
    this.messages.push(payload.message);
    this.emit("change");
  }

});
