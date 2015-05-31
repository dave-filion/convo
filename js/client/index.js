var socket = io();
var events = require('../events.js');
var React = require('react');
var $ = require('jquery');

var MessagesView = require('./MessagesView.js');

var MainView = React.createClass({

  getInitialState: function() {
    return {
      message: "",
      messages: []
    };
  },

  componentDidMount: function() {
    // login
    this.props.socket.emit(events.ATTEMPT_LOGIN, {
      username: "dave",
      roomname: "roomeytoo"
    });

    // login response
    this.props.socket.on(events.LOGIN_SUCCESS, function(payload) {
      this.setState({messages: payload.messages});
    }.bind(this));

    this.refs.MessageInput.getDOMNode().focus();

    this.props.socket.on(events.SEND_MESSAGE, function(payload) {
      var messages = payload.messages;
      this.setState({messages: messages});
    }.bind(this));
  },

  handleSubmit: function(e) {
    e.preventDefault();
    var message = this.state.message;
    this.props.socket.emit(events.SEND_MESSAGE, {message: message,
                           roomname: "roomeytoo",
                           username: "dave"});
    this.setState({message: ""});
  },

  handleMessageChange: function(e) {
    this.setState({message: e.target.value});
  },

  render: function() {
    return (
      <div>
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
});

React.render(<MainView socket={socket} />, document.getElementById('main'));
