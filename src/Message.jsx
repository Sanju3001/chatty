import React, {Component} from 'react';

// Message Component
class Message extends Component {

  render () {

    // change style if the user changes their name
    function getClass(type) {

      var className;

      if (type == "incomingNotification") {
        className="newStyle";
      } else {
        className="message";
      }

      return className;

    }

    return (

      <div className={getClass(this.props.message.type)}>

        <span className="message-username">{this.props.message.username}</span>
        <span className="message-content">{this.props.message.content}</span>

      </div>


    )

  }

}

export default Message;