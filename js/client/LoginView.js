var React = require('react');
var events = require('../events.js');

module.exports = React.createClass({

  getInitialState: function() {
    return {
      username: "",
      roomname: ""
    };
  },

  changeUsername: function(e) {
    this.setState({username: e.target.value});
  },

  changeRoomname: function(e) {
    this.setState({roomname: e.target.value});
  },

  handleSubmit: function(e) {
    e.preventDefault();

    this.props.socket.emit(events.ATTEMPT_LOGIN, {
      username: this.state.username,
      roomname: this.state.roomname
    });
  },

  render: function() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text"
               value={this.state.username}
               placeholder="Username"
               onChange={this.changeUsername} />
        <input type="text"
               value={this.state.roomname}
               placeholder="Room name"
               onChange={this.changeRoomname} />
        <button>Log In</button>
      </form>
    );
  }

});
