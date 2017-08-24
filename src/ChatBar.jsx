import React, {Component} from 'react';

class ChatBar extends Component {

  render () {

   //console.log(this.props);

    return (

      <footer className="chatbar">

        <input onChange={this.props.handleNewUser} className="chatbar-username" placeholder="Enter your name (optional)" name="username" />

        <form onSubmit={this.props.handleNewMessage}>

          <input className="chatbar-message" placeholder="Type a message and hit ENTER" name="text"/>

        </form>

      </footer>

    )

  }

}

export default ChatBar;