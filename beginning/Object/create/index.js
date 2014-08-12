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
assert(bar.__proto__ === Foo.prototype);
// これはなんでだろう..?
assert(bar.prototype !== Foo.prototype);
// これもなんでだろう...?
assert(bar.prototype === foo.prototype);

// オマケだけど、Foo と同じ初期化をしたければこうする
Foo.call(bar, 'a');
assert(bar.notProtoProp === 'a');
