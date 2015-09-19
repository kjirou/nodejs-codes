#!/usr/bin/env node


var blessed = require('blessed');


var screen = blessed.screen({
  smartCSR: true
});

screen.key(['escape', 'q', 'C-c'], function(ch, key) {
  return process.exit(0);
});


var container = blessed.box({
  parent: screen,
  top: 'center',
  left: 'center',
  width: '75%',
  height: 34,
  //border: {
  //  type: 'line'
  //},
  style: {
    fg: 'white',
    bg: 'blue'//,
    //border: {
    //  fg: 'white'
    //}
  }
});

blessed.image({
  parent: container,
  top: 0,
  left: 0,
  // "ansi"(default) or "overlay"(use w3m browser)
  // "overlay" の方、brew install w3m の後にやってみたけど動かない..
  type: 'overlay',
  width: 'shrink',
  height: 'shrink',
  file: __dirname + '/images/treasure_box.png',
  search: false
});


screen.render();
