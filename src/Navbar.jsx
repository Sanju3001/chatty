import React, {Component} from 'react';

class Navbar extends Component {
  render() {
    return (
      <nav className="navbar">

        <img id="chat" src="../images/chat.png" />

        <a href="/" className="navbar-brand">Let's Chat!</a>
      </nav>
    );
  }
}

export default Navbar;