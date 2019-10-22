import React from "react";
import socketIO from 'socket.io-client'
import Grid from './components/Grid'
const socket = socketIO('/')

class App extends React.Component{
  componentDidMount() {
    console.log('app component')

  }

  render() {
    return (
      <div className="container">
        <Grid socket={socket} />
      </div>
    )
  }
}

export default App;
