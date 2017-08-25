import React, {Component} from 'react';
import Navbar from './Navbar.jsx';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {


    constructor(props) {
      super(props);
      this.state = {
        currentUser: {name: "Bob"},
        messages: []
      };
    }


//const socket = new WebSocket('ws://localhost:3001');


  // in App.jsx
componentDidMount() {
  //const ip = '66.207.221.230';
  this.socket = new WebSocket('ws://localhost:3001');
  //console.log(this.socket)
  this.socket.onopen = function(ev) {
    console.log("Connected to server!");
  }

  // socket.onmessage = function(handleNewMessage) {
  //   console.log(handleNewMessage);
  //   var sendMessage = JSON.parse(handleNewMessage);
  //   console.log(sendMessage);
  //   //socket.send(JSON.stringify(handleNewMessage));
  // }
  this.socket.onmessage = (event) => {
    console.log(event);
    // code to handle incoming message
    //var dataType = JSON.parse(event.data.type);
    var inputMessage = JSON.parse(event.data);

    console.log(inputMessage)

    //console.log(this.state.messages);

    switch(inputMessage.type) {
      case "incomingMessage":
        // handle incoming message;
        const newMes = [...this.state.messages, {content: inputMessage.content, username: inputMessage.username}]
        this.setState({messages: newMes});
        break;
      case "incomingNotification":
        // handle incoming notification
        const newNot = [...this.state.messages, {content: inputMessage.content, username: inputMessage.username}]
        this.setState({messages: newNot})
        break;
      default:
        // show an error in the console if the message type is unknown
        throw new Error("Unknown event type " + data.type);
    }



  }


}




  render() {

  console.log("Rendering <App/>");
  console.log(this.state.messages)

    return (


      <div>

        <Navbar />

        <MessageList messages={this.state.messages}/>

        <ChatBar currentUser={this.state.currentUser} handleNewUser={this.handleNewUser} handleNewMessage={this.handleNewMessage} />

      </div>

    )
  };

  handleNewUser = (nameInput) => {
    nameInput.preventDefault()

    var newName = nameInput.target.username.value;

    console.log("this is the new name: ", newName);

    var thisUser = this.state.currentUser.name;
    //var newUser = nameInput.target.value;

    console.log(nameInput);

    if (this.state.currentUser.name !== newName) {
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

    // if (!nameInput.target.value) {
    //   this.state.currentUser.name = 'Anonymous'
    // }
    // else {
    //   this.state.currentUser.name = nameInput.target.value
    // }
  };

  // handleNewUser = (nameInput) => {
  //   nameInput.preventDefault()
  //   if (nameInput.target.value !== this.state.currentUser) {
  //     const newNot = {
  //     type: "postNotification";
  //     content: {this.state.currentUser} " changed their name to " {nameInput.target.value};
  //     };
  //   const messages = this.state.concat(newNot);
  //   var sendNotification = JSON.stringify(newNot);
  //   this.socket.send(sendNotification);
  //   }

  //   else {
  //     this.state.type = "postMessage";
  //     this.state.currentUser.name = nameInput.target.value
  //   }
  // };

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


      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      //this.setState({messages: messages})
      //textInput.target.text.value = ''
  };

}


export default App;
