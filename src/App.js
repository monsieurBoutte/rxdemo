import React, { Component } from 'react';
import SimpleCounter from './components/SimpleCounter';
import { SimpleTodoList } from './components/SimpleTodoList';
import SimpleInterval from './components/SimpleInterval';
import ReactiveComponent from './components/ReactiveComponent';
import SwitchMapComponent from './components/SwitchMapComponent';
import ForkJoinComponent from './components/ForkJoinComponent';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">
            Welcome to React
            <span style={{ color: 'hotpink' }}>ive</span>{' '}
            <span style={{ color: '#7FD8F7' }}>React</span> 🤑
          </h1>
        </header>
        <div className="App-intro">
          {/* <SimpleCounter /> */}

          {/* <br />
          <SimpleTodoList /> */}

          {/* <br />
          <ReactiveComponent /> */}

          {/* <br />
          <SimpleInterval /> */}

          {/* <br />
          <SwitchMapComponent /> */}

          {/* <br />
          <ForkJoinComponent /> */}
        </div>
      </div>
    );
  }
}

export default App;
