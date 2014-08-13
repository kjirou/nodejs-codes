#!/usr/bin/env node

//
// Object.create()
//
//   https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create
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


//
// Foo.prototype を prototype にもつ bar オブジェクトを生成する
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
assert(foo instanceof Foo);


// var bar = new Foo(); と同じであることの確認
assert(bar.prototype === undefined);
assert(bar.__proto__ === Foo.prototype);
assert(bar instanceof Foo);
