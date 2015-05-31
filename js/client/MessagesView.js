var React = require('react');
var moment = require('moment');

// takes messages as prop
module.exports = React.createClass({

  render: function() {
    var messages = this.props.messages.map(function(message, i) {
      return <li key={i}>{moment(message.time).fromNow()} - {message.text}</li>;
    });

    return (
      <ul>
        {messages}
      </ul>
    );
  }

});
