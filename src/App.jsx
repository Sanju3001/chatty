import React, {Component} from 'react';
import Navbar from './Navbar.jsx';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {


  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: ""},
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
    var inputMessage = JSON.parse(event.data);
    console.log(this.state.messages);
    const newMes = [...this.state.messages, inputMessage]
    this.setState({messages: newMes});
  }


}




  render() {

  console.log("Rendering <App/>");

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
    if (!nameInput.target.value) {
      this.state.currentUser.name = 'Anonymous'
    }
    else {
      this.state.currentUser.name = nameInput.target.value
    }
  };

  handleNewMessage = (textInput) => {
    textInput.preventDefault()
      const newMessage = {username: this.state.currentUser.name, content: textInput.target.text.value};
      const messages = this.state.messages.concat(newMessage)
      //const socket = new WebSocket('ws://localhost:3001');
      var sendMessage = JSON.stringify(newMessage);
      this.socket.send(sendMessage);

      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({messages: messages})
      //textInput.target.text.value = ''
  };





}


export default App;
