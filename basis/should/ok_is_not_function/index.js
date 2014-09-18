#!/usr/bin/env node

//
// ok が関数じゃないという点の確認
//
// defineProperty を行って getter として動作させていた
//
// 詳細は以下のコードを参照:
//   https://github.com/shouldjs/should.js/blob/master/lib/should.js
//     の Assertion.add
//   https://github.com/shouldjs/should.js/blob/master/lib/ext/bool.js
//     の 'ok'
//

var assert = require('assert');
var should = require('should');


var foo = true;
// ok は ok() で実行不要、というか「関数ではない」と言われて無理
// Assert されないことが正しいことの証明
foo.should.be.ok;

var bar = false;
assert.throws(function(){
  // 評価時に AssertionError を発行する
  bar.should.be.ok;
}, /AssertionError/);
