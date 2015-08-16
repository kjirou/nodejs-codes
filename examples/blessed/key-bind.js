#!/usr/bin/env node

//
// キーバインド
//
// TODO:
// - screen に指定したときと box に指定した時で何が変わる？
//   - box の状態により ON/OFF 変わればいいけど
//   - element の focus 状態など、blessed 内の状態に左右されるのも変なので
//     この点は保留にしとく
//     blessed 側では screen.key に全ページで使い得る全キーを受け付け状態にして、
//     状態により、別手段で取捨選択する方が良さそう。その論点もありそう
//
//
// MEMO:
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
  height: 5,
  style: {
    fg: 'white',
    bg: 'magenta'
  }
});

var display = blessed.box({
  parent: container,
  top: 2,
  left: 2,
  width: 10,
  height: 1,
  style: {
    fg: 'white',
    bg: 'black'
  }
});

screen.key(['escape', 'q', 'C-c'], function(ch, key) {
  return process.exit(0);
});

// アルファベット
var keys = ['j', 'k', 'l', 'h'];
// 名前付けで正規化された特殊なキー、これは矢印キー
// lib/keys.js 参照
keys = keys.concat(['up', 'right', 'down', 'left']);
//screen.debug(keys);

// WARNING:
// もし、誤って同じキーを ['a', 'a'] こんな風に keys に登録してしまうと
// 無視されずに2回イベントが発火してしまうので注意
screen.key(keys, function(ch, key) {
  screen.debug((new Date()).getTime(), ':', key.name);
  display.setContent(key.name);
  display.render();
});


screen.render();
