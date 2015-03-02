#!/usr/bin/env node

var assert = require('assert');
var merge = require('utils-merge');


//
// コード見た方が早かった
// https://github.com/jaredhanson/utils-merge/blob/master/index.js
//

assert.deepEqual(merge({ x: 1 }, { y: 2 }), { x: 1, y: 2 });
assert.deepEqual(merge({ x: 1 }, { y: 2, obj: { foo: 1 }, ary: [1] }), {
  x: 1,
  y: 2,
  obj: { foo: 1 },
  ary: [1]
});
assert.deepEqual(merge({a:{b:{c:1}}}, {a:{b:{d:2}}}), {
  a: {
    b: {
      d: 2  // c:1 は消える
    }
  }
});
