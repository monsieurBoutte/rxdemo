import React, { Component } from 'react';
import { Subject } from 'rxjs';
import '../styles/SimpleToDoList.css';

// the events we want to track through our subscriptions
const currentInputValue$ = new Subject();
const addTodoItem$ = new Subject();
const updateTodoItem$ = new Subject();
const deleteTodoItem$ = new Subject();

class SimpleTodoList extends Component {
  state = {
    todos: [],
    input: ''
  };

  // subscribe to our event streams that were created above
  componentDidMount() {
    // Update our state when the current input value changes
    currentInputValue$.subscribe(input => this.setState({ input }));

    // Update our state once we've added a Todo Item
    addTodoItem$.subscribe(() => {
      this.setState({
        input: '',
        todos: [
          ...this.state.todos,
          {
            text: this.state.input,
            done: false
          }
        ]
      });
    });

    // Update our state when a todo item gets nixed
    deleteTodoItem$.subscribe(index => {
      this.setState({
        todos: this.state.todos.filter((_, _index) => index !== _index)
      });
    });

    // Update our state when a todo item gets updated
    updateTodoItem$.subscribe(({ index, ...obj }) => {
      let tempItems = this.state.todos;
      tempItems[index] = { ...this.state.todos[index], ...obj };
      this.setState({ todos: tempItems });
    });
  }

  render() {
    return (
      <div className="todo-list-section">
        <input
          className="input-field"
          type="text"
          autoFocus
          placeholder="placeholder stuff..."
          value={this.state.input}
          onChange={e => currentInputValue$.next(e.target.value)}
        />
        <button className="btn" onClick={() => addTodoItem$.next()}>
          Add to list
        </button>
        {this.state.todos.length > 0 && (
          <ul style={{ listStyleType: 'none' }}>
            {this.state.todos.map(({ text, done }, index) => {
              return (
                <li className="todo-item" key={index}>
                  <input
                    onChange={() =>
                      updateTodoItem$.next({ index, done: !done })
                    }
                    checked={done}
                    type="checkbox"
                    value=""
                  />
                  {done === true ? (
                    <strike className="done-txt">{text}</strike>
                  ) : (
                    <span className="todo-text">{text}</span>
                  )}
                  <button
                    className="btn"
                    onClick={() => deleteTodoItem$.next(index)}
                  >
                    Delete
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    );
  }
}

export { SimpleTodoList, currentInputValue$ };
