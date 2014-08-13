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

// Foo.prototype を prototype にもつ bar オブジェクトを生成する
var bar = Object.create(Foo.prototype);
assert(bar.__proto__.protoProp === 10);


// オマケ: Foo と同じ初期化をしたければこうする
Foo.call(bar, 'a');
assert(bar.notProtoProp === 'a');


// オマケ: prototype や __proto__ のこと
assert(foo.prototype !== Foo.prototype);
assert(foo instanceof Foo);
assert(foo.__proto__ === Foo.prototype);  // @TODO __proto__ って何？

assert(bar.prototype !== Foo.prototype);
assert(bar instanceof Foo);
assert(bar.__proto__ === Foo.prototype);
assert(bar.prototype === foo.prototype);  // @TODO 何故？
