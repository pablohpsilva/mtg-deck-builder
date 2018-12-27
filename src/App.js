import React, { Component } from 'react';
import './App.css';
import Share from './components/Share';
import Editor from './components/Editor';
import Viewer from './components/Viewer';

class App extends Component {
  render() {
    return (
      <div className="App">
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
