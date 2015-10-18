//
// Run by babel-node
//

import blessed from 'blessed';
import React, { Component } from 'react';
import { render } from 'react-blessed';


const screen = blessed.screen({
  debug: true,
  smartCSR: true,
});

screen.key(['escape', 'C-c'], function(ch, key) {
  return process.exit(0);
});


class Root extends Component {

  constructor() {
    super();

    this.state = {
      todos: [
        { id: 1, title: 'Foo' },
        { id: 2, title: 'Bar' },
        { id: 3, title: 'Baz' }
      ]
    };
  }

  componentDidMount() {
    this.refs.first.key(['g'], (ch, key) => {
      const newTodos = this.state.todos.slice(0, this.state.todos.length - 1)
      screen.debug('todos:', newTodos.length);
      this.setState({
        todos: newTodos,
      });
    });
    this.refs.first.focus();
  }

  render() {

    return (
      <box {...{
        ref: 'first',
        top: 0,
        left: 0,
        width: 20,
        height: 10,
        style: {
          fg: 'white',
          bg: 'blue',
        },
      }}>
      {
        this.state.todos.map((todo, i) => {
          return <box {...{
            key: 'row-' + i,
            top: i,
            content: todo.id + todo.title,
          }} />;
        })
      }
      </box>
    );
  }
}

render(<Root />, screen);
