#!/usr/bin/env node

//
// 出力をバッファではなく文字列で取得したい
//
// テストを見ると https://github.com/chjj/blessed/blob/master/test/widget.js
// 外部出力した .log をとっているみたい
//

var blessed = require('blessed');


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
// leave ってのもあった
screen.key('d', function() {
  screen.destroy();
  console.log('After destroying');  // 出力される
});

// screenshot で文字列で取得できる、色付き
screen.key('s', function() {
  // xi, xl, yi, yl
  //   ||
  // columnIndex, columnLength, rowIndex, rowLength
  var text = screen.screenshot(2, 5, 0, 1);
  screen.debug(text);
  screen.debug(text.length);
  screen.debug(text.toString());
  screen.debug(text === '345');
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
