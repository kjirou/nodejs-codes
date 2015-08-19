#!/usr/bin/env node

//
// 出力をバッファではなく文字列で取得したい
//
// TODO:
// - screen を生成しても表示をバッファ状態にしない
//   - drawとか見ればある？
//

var blessed = require('blessed');
var chalk = require('chalk');
var jsesc = require('jsesc');


// この screen オブジェクト生成時点で、バッファ状態に遷移する
var screen = blessed.screen({
  // 使えそうだったけど、エラーが出たので保留
  //dump: true,
  debug: true
});


// 制御を戻す例その1
screen.key(['escape', 'C-c'], function(ch, key) {
  process.exit(0);
});

// 制御を戻す例その2
screen.key('d', function() {
  screen.destroy();
  console.log('After destroying');  // 出力される
});

// 制御を戻す例その3
// - これが一番良い
// - leave 中か enter 中かのフラグは、this.program.isAlt みたい
screen.key('l', function() {
  screen.leave();  // 画面は消える
  console.log('After leaving');  // 出力され、プロセスは落ちない
  setTimeout(function() {
    screen.enter();
    console.log('After entering');  // これは出力されない、謎
    setTimeout(function() {
      screen.render();
    }, 500);
  }, 1000);
});

// alloc は表示を消すだけ
// relloc はまだリリースされていない
//screen.key('a', function() {
//  screen.alloc();
//  console.log('After allocating');
//});

//
// screenshot で文字列で取得できる、色付き
//
// テストだと: https://github.com/chjj/blessed/blob/master/test/widget.js
// 外部出力した .log から出力をとっているみたい？
// これでも充分なように見える
//
screen.key('s', function() {
  // xi, xl, yi, yl
  //   ||
  // columnIndex, columnLength, rowIndex, rowLength
  var text = screen.screenshot(2, 5, 0, 1);
  var cleaned = chalk.stripColor(text);
  screen.debug('----');
  screen.debug(text, 'is ' + text.length + ' length');
  screen.debug('----');
  screen.debug(cleaned, 'is ' + cleaned.length + ' length');
  screen.debug('----');
  screen.debug(jsesc(chalk.stripColor(text)) === '345\\n');
});

var container = blessed.box({
  parent: screen,
  top: 'top',
  left: 'left',
  width: 20,
  height: 10,
  style: {
    fg: 'white',
    bg: 'magenta'
  },
  content: [
    '12345678901234567890',
    '12345678901234567890',
    '12345678901234567890',
    '12345678901234567890'
  ].join('\n')
});

screen.render();
