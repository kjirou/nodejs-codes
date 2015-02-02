#!/usr/bin/env node

//
// over
//
// 関数へオーバーロード機能を付与するモジュール
//
// 結論としては、判定が複雑なので、
// (opts, cb) と (cb) の切り替えをするだけなら不要だった。
//

var assert = require('assert');
var over = require('over');


// 基本的な使い方
var foo = over([
  [
    over.string,
    function(str){
      return str;
    }
  ],
  [
    over.number,
    function(num){
      return num * 2;
    }
  ],
  function(){
    return 'default';
  }
]);
assert(foo() === 'default');
assert(foo('FOO') === 'FOO');
assert(foo(5) === 10);


// マッチする引数パターンが無いとエラーになる
var bar = over([
  [
    over.string,
    function(str){
      return str;
    }
  ]
]);
assert(bar('BAR') === 'BAR');
assert.throws(function(){
  bar();
}, /No match found/);


// Optional, OptionalWithDefault()
var baz = over([
  [
    over.string,
    over.numberOptional,
    over.numberOptionalWithDefault(5),
    function(a, b, c){
      return [a, b, c];
    }
  ]
]);
assert.deepEqual(baz('a', 2, 3), ['a', 2, 3]);
assert.deepEqual(baz('a', 2), ['a', 2, 5]);
assert.deepEqual(baz('a'), ['a', undefined, 5]);


// callbackOptional は "Optional" なのにデフォルトで空関数が入る
// わかりにくいので使い難い
var hoge = over([
  [
    over.string,
    over.callbackOptional,
    // これを加えると No match found エラーになる
    //function(str){
    //},
    function(str, callback){
      return str + callback.toString();
    }
  ]
]);
assert(hoge('A ') === 'A function defaultCallback() {}');


// 良くわからない点
var hige = over([
  [
    over.string,
    over.objectOptional,
    over.func,
    function(str, callback){
      return callback(str);
    }
  ]
]);
// 実行すると
//   TypeError: undefined is not a function
// になる、詳細不明。
//assert(hige('a', function(str){ return str + 'b' }) === 'ab');
