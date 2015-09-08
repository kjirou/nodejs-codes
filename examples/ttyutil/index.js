#!/usr/bin/env node

//
// TODO
// - start してもマウスイベント拾えない
//   - ttyu.mode は正しく Terminal.app を認識していた
//   - MOUSEDOWN イベント名の渡し間違いもない
//
// ただ、インスタンス生成時に画面再描画しちゃうのが扱いにくそうなので
// とりあえず動作確認はいいや。
//
// マウスイベントパーサーだけ拾えれば拾う
//

var TTYUtil = require('ttyutil');


var ttyu = new TTYUtil();

ttyu.on(TTYUtil.EVENT.MOUSEDOWN, function() {
  console.log(arguments);
});

ttyu.start();

//ttyu.on(TTYUtil.EVENT.MOUSEUP, function() {
//});
//ttyu.on(TTYUtil.EVENT.MOUSEMOVE, function() {
//});
//ttyu.on(TTYUtil.EVENT.MOUSEWHEEL, function() {
//});
//ttyu.on(TTYUtil.EVENT.MOUSEHWHEEL, function() {
//});
