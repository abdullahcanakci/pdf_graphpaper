import React from "react";
import Generate from "./components/Generate";
import './App.css'
class App extends React.Component{
  componentDidMount() {
    console.log('app component')

  }

  render() {
    return (
      <div className="section">
        <div className="container">
          <Generate />
        </div>
      </div>
    )
  }
}

export default App;
