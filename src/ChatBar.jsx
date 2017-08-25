import React, {Component} from 'react';

class ChatBar extends Component {

  render () {

   //console.log(this.props);

    return (

     <footer className="chatbar">

      <form onSubmit={this.props.handleNewUser} className="chatbar-username">

        <input className="chatbar-input" placeholder="Enter your name (optional)" name="username" />

      </form>

        <form onSubmit={this.props.handleNewMessage} className="chatbar-message">

          <input className="chatbar-input" placeholder="Type a message and press ENTER" name="text"/>

        </form>

      </footer>

    )

  }

}

export default ChatBar;