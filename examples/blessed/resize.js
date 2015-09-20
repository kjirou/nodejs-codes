#!/usr/bin/env node

var blessed = require('blessed');


var screen = blessed.screen({
  debug: true
  //smartCSR: true
});

screen.key(['escape', 'C-c'], function(ch, key) {
  return process.exit(0);
});


var container = blessed.box({
  parent: screen,
  top: 'center',
  left: 'center',
  width: 40,
  height: 20,
  style: {
    fg: 'white',
    bg: 'blue'
  }
});

var box = blessed.box({
  parent: container,
  top: 0,
  left: 0,
  width: 1,
  height: 1,
  style: {
    fg: 'white',
    bg: 'magenta'
  }
});

screen.key(['r'], function(ch, key) {
  box.width = box.width + 1;
  box.height = box.height + 1;
  screen.render();
});

screen.render();
