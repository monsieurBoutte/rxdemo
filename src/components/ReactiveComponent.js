import React, { Component } from 'react';
import { currentInputValue$ } from './SimpleTodoList';
import '../styles/ReactiveComponent.css';

export default class ReactiveComponent extends Component {
  state = {
    input: ''
  };

  componentDidMount() {
    currentInputValue$.subscribe(input => this.setState({ input }));
  }

  render() {
    const { input } = this.state;
    return <div className="reactive-section">reactive message 🎉 {input}</div>;
  }
}
