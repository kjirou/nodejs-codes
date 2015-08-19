#!/usr/bin/env node

//
// デバッグプリントを出力する
//
// 出力方法:
// - screen 生成時に debug: true を入れる
// - screen.debug を使う
// - F12 を押す
//
// screen オブジェクトを引き回さないと出力できない
// 解決法は不明
//

var blessed = require('blessed');


var screen = blessed.screen({
  debug: true
});

var container = blessed.box({
  parent: screen,
  top: 'top',
  left: 'left',
  width: '100%',
  height: 10,
  style: {
    fg: 'white',
    bg: 'magenta'
  },
  content: 'Push F12 to show debug print'
});

// 'q' を押しても toggle するが、意図はしてないみたいだけどバグというほどでもなかった
// Ref) https://github.com/kjirou/nodejs-codes/issues/1

screen.key(['escape', 'C-c'], function(ch, key) {
  return process.exit(0);
});

screen.debug('Hello!');
screen.debug('World!', 1, true, null);
screen.debug('Array:', [1, 2, 3]);
screen.debug('Object:', {x:1, y:2, z:3});


screen.render();
