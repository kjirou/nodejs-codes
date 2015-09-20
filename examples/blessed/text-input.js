#!/usr/bin/env node

//
// マニュアル読んでもメリットが良くわからんし、
// 特に必要じゃなかったので動かないまま終了
//


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
  width: '50%',
  height: 11,
  style: {
    fg: 'white',
    bg: 'blue'
  }
});

var textBox = blessed.textbox({
  parent: container,
  top: 0,
  left: 0,
  width: '100%',
  height: 1,
  style: {
    fg: 'white',
    bg: 'magenta'
  }
});

textBox.focus();

screen.render();
