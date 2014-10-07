#!/usr/bin/env node

//
// Jade の mixin 関数に渡す block の変数スコープは、
//
//   a. グローバルなスコープ
//   b. mixin 関数内のスコープ
//
// の、どちらかを確認したところ 2 だったという話
//

var assert = require('assert');
var jade = require('jade');


var source = [
  'mixin foo(x)',
  '  div',
  '    block',
  '- var y = "Y"',
  '+foo("X")',
  '  div',
  '    p x=#{x}',
  '    p y=#{y}'
].join('\n');

var fn = jade.compile(source);
var html = fn();

assert(html.indexOf('<p>x=</p>') > 0);  // mixin 関数の引数で渡した x は非表示
assert(html.indexOf('<p>y=Y</p>') > 0);  // グローバルな変数の y は表示
