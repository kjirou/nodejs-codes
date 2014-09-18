#!/usr/bin/env node

var assert = require('assert');
var sinon = require('sinon');


//
// foo が 1 回だけ実行されていることを確認する
//
var fooFunc = function(){};
var obj = {
  foo: fooFunc
};
// mock する
var fooMock = sinon.mock(obj);
// foo の呼び出しが 1 回であることを設定する
fooMock.expects('foo').once();
// foo が別のものに変わっている
// (ただ、fooMock そのものでもなかった。モックされた foo が fooMock 内のどこにあるのかは不明)
assert.notStrictEqual(obj.foo, fooFunc);
// 1 回実行
obj.foo();
// 1 回だけ実行されており、エラーが無かったことを検証する
fooMock.verify();
// verify 時に restore も同時にされる
// なお、fooMock.expects() で返される Expectation オブジェクトの verify は restore されないので注意
assert.strictEqual(obj.foo, fooFunc);
