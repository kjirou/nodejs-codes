#!/usr/bin/env node

//
// 描画は子要素のrenderでも行うことができるのか
//
// 質問したら https://github.com/chjj/blessed/issues/169
// その方法は非推奨で、もし速度が欲しいなら以下を使ってくれとのこと
//
// ----
// - Detach the element from its parent, append it to the parent's parent,
//     and reposition it properly (and then hide() the original parent when you want).
// - Create a Layout element, which uses a custom renderer,
//     to check something like a noRenderParent flag on an element (see the readme for an example of a renderer).
//   It would be a little hacky since you would have to recursively iterate over all children in the renderer
//     (element.forDescendants()) and check for the option.
// - Remove all content and style from the parent element.
// - Create a duplicate element behind the parent which is displayed when the parent is detached.
// ----
//
// READMEには:
// ```
// render() - Write content and children to the screen buffer.
// ```
// と書いてあるので、出来そうではある。
//
// 結論として、今のところは element.render の後に
// ```
// screen.draw(startRowIndex, endRowIndex)
// ```
// を行う、という方法しか見つかっていない。
//
//
// TODO:
// - アプリ作ってて、座標が取れない的なエラーに成ったことがあるのでその再現
//

var blessed = require('blessed');


var screen = blessed.screen({
  // Warning: debug すると screen.render されてしまうので検証にならなくなる
  //debug: true
});

screen.key(['escape', 'C-c'], function(ch, key) {
  process.exit(0);
});
screen.key('r', function(ch, key) {
  screen.render();
});

var foo = blessed.box({
  parent: screen,
  top: 'top',
  left: 'left',
  width: 12,
  height: 5,
  tags: true,
  style: {
    fg: 'white',
    bg: 'magenta'
  },
  content: 'foo'
});
// これらは通る、子要素への伝搬も動いている
//foo.on('render', function() {
//  console.log('foo is rendered');
//});

var bar = blessed.box({
  parent: foo,
  top: 'center',
  left: 'center',
  width: 10,
  height: 1,
  tags: true,
  style: {
    fg: 'white',
    bg: 'black'
  },
  content: 'bar'
});
//bar.on('render', function() {
//  console.log('bar is rendered');
//});

screen.key('f', function(ch, key) {
  foo.setContent(foo.content + 'x');
  foo.render();
  // これで明示的に描画すればOK
  //screen.draw(0, 0);
});
screen.key('b', function(ch, key) {
  bar.setContent(bar.content + 'x');
  bar.render();
  //screen.draw(2, 2);
});

screen.render();
