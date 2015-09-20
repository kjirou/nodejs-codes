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
      top: 0,
      left: 0,
      width: 2,
      height: 1,
    };
  }

  componentDidMount() {
    setInterval(() => {
      this.setState({
        // top and left are applied ..
        top: this.state.top + 1,
        left: this.state.left + 1,
        // .. but width and height are not applied
        width: this.state.width + 1,
        height: this.state.height + 1,
      });
    }, 1000);
  }

  render() {

    let boxProps = Object.assign({
      style: {
        fg: 'white',
        bg: 'magenta',
      },
    }, this.state);

    return (
      <box {...{
        top: 0,
        left: 0,
        width: 40,
        height: 20,
        style: {
          fg: 'white',
          bg: 'blue',
        },
      }}>
        <box {...boxProps}/>
      </box>
    );
  }
}

render(<Root />, screen);
