#!/usr/bin/env node

//
// 状態によるキーバインドの変化
//
// - box の focus でキーバインドも変わる
// - box の 表示/非表示 で 有効/無効 になる
//

var blessed = require('blessed');


var screen = blessed.screen({
  debug: true
});

screen.key(['escape', 'q', 'C-c'], function(ch, key) {
  return process.exit(0);
});

var container = blessed.box({
  parent: screen,
  top: 'top',
  left: 'left',
  width: 9,
  height: 3,
  style: {
    fg: 'white',
    bg: 'magenta'
  }
});

var fooBox = blessed.box({
  parent: container,
  top: 1,
  left: 1,
  width: 3,
  height: 1,
  style: {
    fg: 'white',
    bg: 'black',
    focus: {
      fg: 'red'
    }
  },
  content: 'foo'
});

var barBox = blessed.box({
  parent: container,
  top: 1,
  right: 1,
  width: 3,
  height: 1,
  style: {
    fg: 'white',
    bg: 'black',
    focus: {
      fg: 'red'
    }
  },
  content: 'bar'
});

fooBox.focus();

// focus 中のキーバインド*だけ*が適用される
// screen へのキーバインドは常に有効(qで終了可能)
fooBox.key(['space', 'b'], function(ch, key) {
  screen.debug('Pushed:' + key.name);
  barBox.focus();
});
barBox.key(['space', 'f'], function(ch, key) {
  screen.debug('Pushed:' + key.name);
  fooBox.focus();
});

//
// 表示中でない場合はキーバインドも無効になる
//
// - つまり 't' を 2 連打しても toggle されないし、ログにも一行しか残らない
// - barBox 側に自動的に focus が移ることもない
//
fooBox.key(['t'], function(ch, key) {
  screen.debug('Pushed:' + key.name);
  if (fooBox.visible) {
    fooBox.hide();
  } else {
    fooBox.show();
  }
});

screen.render();
