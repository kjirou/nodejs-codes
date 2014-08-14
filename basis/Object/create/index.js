#!/usr/bin/env node

//
// Object.create()
//
//   https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Object/create
//

var assert = require('assert');


function Foo(val) {
  this.notProtoProp = val;
}
Foo.prototype.protoProp = 10;


var foo = new Foo('a');
assert(foo.protoProp === 10);
assert(foo.notProtoProp === 'a');
assert(foo.__proto__.protoProp === 10);
assert(foo instanceof Foo);


//
// Foo.prototype をプロトタイプとする bar オブジェクトを生成する
//
// new Foo との違いは:
// - コンストラクタを実行しないで良い
//
var bar = Object.create(Foo.prototype);
assert(bar.__proto__.protoProp === 10);

// その後に、Foo コンストラクタを実行する方法
Foo.call(bar, 'a');
assert(bar.notProtoProp === 'a');


// オマケ: prototype や __proto__ のこと
assert(typeof Foo.prototype === 'object');
assert(foo.prototype === undefined);  // "prototype" プロパティ自体は関数オブジェクトにしか無い
assert(foo.__proto__ === Foo.prototype);  // プロトタイプチェーンの実体は __proto__ である


// var bar = new Foo(); と同じであることの確認
assert(bar.prototype === undefined);
assert(bar.__proto__ === Foo.prototype);
assert(bar instanceof Foo);


// Object.create 第二引数の使い方
var baz = Object.create(Foo.prototype, {
  x: {
    value: 123
  }
});
assert(baz.x === 123);
assert(baz.__proto__.x === undefined);
