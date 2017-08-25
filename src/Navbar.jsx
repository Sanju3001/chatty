import React, {Component} from 'react';

// Navbar component
class Navbar extends Component {

  render() {

    return (

      <nav className="navbar">

        <img id="chat" src="../images/chat.png" />

        <a href="/" className="navbar-brand">Chatty!!</a>

        <span className="userCount">{this.props.count} users online</span>

      </nav>

    );

  }

}

export default Navbar;