#!/usr/bin/env node

var assert = require('assert');


//
// getter を 別オブジェクトへコピーすると
// this の実体は mixin 先になるか？
//
var src = { _x: 1 };
Object.defineProperty(src, 'x', {
  get: function() { return this._x; }
});

var dest = { _x: 2 };
dest.x = src.x;

assert.strictEqual(src.x, 1);
assert.strictEqual(dest.x, 1);  // 元の値を指し続ける
