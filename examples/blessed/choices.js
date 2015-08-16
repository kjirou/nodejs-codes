#!/usr/bin/env node

//
// examples/simple-form の通りに Tab ボタンで focus の変わるフォームの検証
//
// まず、keys を有効にするには以下の要件が必要：
//
// - ボタン群を格納する form へ keys: true のオプションを設定
//   - 子のボタン側の keys に意味があるのかは不明
// - 常に screen とのリレーションを切らさないように append する
//   - 下記例だと screen(form(button)) という親子関係だが
//     screen.append(form) -> form.append(button) が正しい指定方法
//     form.append(button) -> screen.append(form) だと失敗する
//   - DOMを手なりで作る場合と逆になるので注意
//     - parent で関係を定義すると自動的に要件を満たせる
//   - 他のオプションでも同じことになるかもしれないので、基本 parent を使うべきっぽい
//

var blessed = require('blessed');


var screen = blessed.screen();

var container = blessed.form({
  //parent: screen,
  top: 'top',
  left: 'left',
  width: '100%',
  height: 10,
  //mouse: true,
  keys: true,
  style: {
    fg: 'white',
    bg: 'magenta'
  }
});

var title = blessed.text({
  top: 'top',
  left: 'left',
  height: 1,
  //keys: true,
  style: {
    fg: 'white',
    bg: 'magenta'
  },
  content: 'Select a stage (Push tab button to switch choice)'
});

var choices = [0, 1, 2].map(function(i) {
  var label = {
    0: 'foo',
    1: 'bar',
    2: 'baz'
  }[i];
  var choice = blessed.button({
    //parent: container,
    top: 2 + i,
    left: 'left',
    //mouse: true,
    keys: true,
    style: {
      fg: 'white',
      bg: 'magenta',
      focus: {
        fg: 'black',
        bg: 'white'
      }
    },
    content: i + '. ' + label
  });
  return choice;
});

screen.append(container);
container.append(title);
choices.forEach(function(choice) {
  container.append(choice);
});


screen.key(['escape', 'q', 'C-c'], function(ch, key) {
  return process.exit(0);
});


screen.render();
