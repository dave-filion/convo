var socket = io();
var events = require('../events.js');
var React = require('react');
var $ = require('jquery');
var _ = require('underscore');

var MessagesView = require('./MessagesView.js');
var LoginView = require('./LoginView.js');

var MainView = React.createClass({

  getInitialState: function() {
    return {
      username: null,
      roomname: null,
      message: "",
      messages: []
    };
  },

  componentDidMount: function() {
    // login response
    // TODO need to only broadcast this to the user
    this.props.socket.on(events.LOGIN_SUCCESS, function(payload) {
      this.setState({
        username: payload.username,
        roomname: payload.room.name,
        messages: payload.room.messages
      });
    }.bind(this));

    this.props.socket.on(events.SEND_MESSAGE, function(payload) {
      var messages = payload.messages;
      this.setState({messages: messages});
    }.bind(this));
  },

  handleSubmit: function(e) {
    e.preventDefault();
    var message = this.state.message;
    var request = {
      message: message,
      roomname: this.state.roomname,
      username: this.state.username
    };
    this.props.socket.emit(events.SEND_MESSAGE, request);
    this.setState({message: ""});
  },

  handleMessageChange: function(e) {
    this.setState({message: e.target.value});
  },

  render: function() {
    var content;
    if (_.isNull(this.state.username)) {
      content = <LoginView socket={this.props.socket} />;
    } else {
      content = (
        <div>
          <h1>{this.state.username} in {this.state.roomname}</h1>
          <MessagesView messages={this.state.messages} />
          <form onSubmit={this.handleSubmit}>
            <input ref="MessageInput"
                onChange={this.handleMessageChange}
                value={this.state.message}
                autoComplete="off" />
            <button>Send</button>
          </form>
        </div>
      );
    }
    return <div>{content}</div>;
  }
});

React.render(<MainView socket={socket} />, document.getElementById('main'));
