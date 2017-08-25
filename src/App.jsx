import React, {Component} from 'react';
import Navbar from './Navbar.jsx';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: "Anonymous"},
      messages: [],
      userCount: 0
    };
  }

  // execute when component is mounted
  componentDidMount() {

    this.socket = new WebSocket('ws://localhost:3001');

    this.socket.onopen = function(ev) {
      console.log("Connected to server!");
    }

    this.socket.onmessage = (event) => {

      // view incoming message in Dev Tools console
      console.log(event);

      var inputMessage = JSON.parse(event.data);
      var count;

      // handle each different message/notification type
      switch(inputMessage.type) {
        case "incomingMessage":
          // handle incoming message;
          const newMes = [...this.state.messages, {username: inputMessage.username, content: inputMessage.content}]
          count = inputMessage.count
          this.setState({messages: newMes, userCount: count});
          break;
        case "incomingNotification":
          // handle incoming notification
          const newNot = [...this.state.messages, {username: inputMessage.username, content: inputMessage.content}]
          count = inputMessage.count
          this.setState({messages: newNot, userCount: count})
          break;
        default:
          // show an error in the console if the message type is unknown
          throw new Error("Unknown event type " + data.type);
      }

    }

  }

  // render component
  render() {

  console.log("Rendering <App/>");

    return (

      <div>

        <Navbar count = {this.state.userCount} />

        <MessageList messages={this.state.messages}/>

        <ChatBar currentUser={this.state.currentUser} handleNewUser={this.handleNewUser} handleNewMessage={this.handleNewMessage} />

      </div>

    )

  };

  // Event handling for when a user changes their name
  handleNewUser = (nameInput) => {
    nameInput.preventDefault()

    // By default a user is anonymous when the app launches (since their is no log-in)
    if (!nameInput.target.username.value) {
        nameInput.target.username.value = 'Anonymous'
     }


    var newName = nameInput.target.username.value;

    var thisUser = this.state.currentUser.name;

    if (thisUser !== newName) {
        const newNot = {
          type: "postNotification",
          username: newName,
          content: thisUser + " changed their name to " + newName
        };

        this.state.currentUser.name = newName;

        const messages = this.state.messages.concat(newNot);
        var sendNotification = JSON.stringify(newNot);
        this.socket.send(sendNotification);
    }


  };

  // Event handling for a new message
  handleNewMessage = (textInput) => {

    textInput.preventDefault()

        const newMessage = {
          type: "postMessage",
          username: this.state.currentUser.name,
          content: textInput.target.text.value
        };

        const messages = this.state.messages.concat(newMessage)
        //const socket = new WebSocket('ws://localhost:3001');
        var sendMessage = JSON.stringify(newMessage);
        this.socket.send(sendMessage);

  };

}


export default App;
