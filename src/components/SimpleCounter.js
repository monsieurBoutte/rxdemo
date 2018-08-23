import React, { Component } from 'react';
import { Subject } from 'rxjs';
import '../styles/SimpleCounter.css';
// here's our observable stream
// Subjects are like EventEmitters,
// they maintain a registry of what's being emitted
const counter = new Subject();

export default class SimpleCounter extends Component {
  // we start with an inital total of 0
  state = {
    number: 0
  };

  componentDidMount() {
    // We update the state in our subscribe via .next() callback from the counter stream
    counter.subscribe(
      val => this.setState({ number: this.state.number + val }),
      err => console.log('we done messed up'),
      () => console.log('finished!')
    );
  }

  render() {
    return (
      <React.Fragment>
        <div className="title">Count: {this.state.number}</div>
        {/* for each click, we'll emit a new value */}
        <button className="btn-plus" onClick={() => counter.next(1)}>
          Plus
        </button>
        <button className="btn-minus" onClick={() => counter.next(-1)}>
          Minus
        </button>
      </React.Fragment>
    );
  }
}
