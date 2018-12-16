import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Share from './components/Share';
import Editor from './components/Editor';
import Viewer from './components/Viewer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <section>
          <Editor/>
          <Viewer/>
          <Share/>
        </section>
      </div>
    );
  }
}

export default App;
