#!/usr/bin/env node


var jade = require('jade');
var assert = require('assert');


// 最もシンプルな例
var html = jade.renderFile('./foo.jade', {
  name: 'Taro'
});

console.log(html);
assert(/Taro/.test(html));


// オプション設定も含めてテンプレ変数になっている
var html = jade.renderFile('./bar.jade', {
  pretty: true,
  name: 'Jiro'
});

console.log(html);
assert(/Jiro/.test(html));


// locals 以下にも入ってたりする
var html = jade.renderFile('./baz.jade', {
  pretty: true,
  name: 'Saburo'
});

console.log(html);
assert(/Saburo/.test(html));
