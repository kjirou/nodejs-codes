#!/usr/bin/env node

//
// ユニットテストを行う場合にどう書くか
//
// 1. 出力に影響させず、本来出力すべき内容を文字列で取得したい
//

var assert = require('assert');
var blessed = require('blessed');
var devnull = require('dev-null');


// この screen オブジェクト生成時点で、バッファ状態に遷移するが..
var screen = blessed.screen({
  // ..出力先を変えてそのままにすることができる
  // 終了はしない
  output: devnull(),
  debug: true
});

screen.key(['escape', 'C-c'], function(ch, key) {
  process.exit(0);
});

var container = blessed.box({
  parent: screen,
  top: 'top',
  left: 'left',
  width: 20,
  height: 10,
  content: [
    '12345678901234567890',
    '12345678901234567890',
    '12345678901234567890'
  ].join('\n')
});

screen.render();

// xi, xl, yi, yl
//   ||
// columnIndex, columnLength, rowIndex, rowLength
setTimeout(function() {
  var text = screen.screenshot(0, 3, 0, 2);
  console.log('--------');
  console.log(text);
  console.log('--------');
  // output を devnull にしてしまうと先頭1文字しか取れてない
  // 取れれば裏で生成してテストできたんだけども無理そう
  assert.strictEqual(text, '1\n');
  //assert.strictEqual(text, '123\n123\n');
  screen.destroy();
}, 1000)
