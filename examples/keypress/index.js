#!/usr/bin/env node

var keypress = require('keypress');


keypress(process.stdin);

process.stdin.on('keypress', function (ch, key) {
  console.log('got "keypress"', key);
  if (key && key.ctrl && key.name == 'c') {
    process.stdin.pause();
  }
});

// 詳細不明だけど、setRawMode しないと arrow keys を解釈してくれなくなる
process.stdin.setRawMode(true);

// 入力待ち
process.stdin.resume();
