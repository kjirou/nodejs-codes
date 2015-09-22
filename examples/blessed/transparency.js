#!/usr/bin/env node

var blessed = require('blessed');


var screen = blessed.screen({
  smartCSR: true,
  debug: true
});

screen.key(['escape', 'C-c'], function(ch, key) {
  return process.exit(0);
});


var container = blessed.box({
  parent: screen,
  top: 'center',
  left: 'center',
  width: 10,
  height: 1,
  style: {
    bg: 'blue'
  }
});

var box = blessed.box({
  parent: container,
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  style: {
    fg: 'white',
    //transparent: true
  },
  content: 'abcde'
});

screen.render();
