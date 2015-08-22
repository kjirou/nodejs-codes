#!/usr/bin/env node

var keypress = require('keypress');


keypress(process.stdin);

// 詳細不明だけど、数値は ch の方にしか入らない
// shift や ctrl 同時押しどうするんだろう
process.stdin.on('keypress', function (ch, key) {
  console.log('got "keypress"', ch, key);
  if (key && key.ctrl && key.name == 'c') {
    process.stdin.pause();
  }
});

// 詳細不明だけど、setRawMode しないと arrow keys を解釈してくれなくなる
process.stdin.setRawMode(true);

// 入力待ち
process.stdin.resume();
