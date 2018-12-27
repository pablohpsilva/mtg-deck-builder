import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import Viewer from './components/Viewer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <section>
          <Header/>
          <Viewer/>
        </section>
      </div>
    );
  }
}

export default App;
