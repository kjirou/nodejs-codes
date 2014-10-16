#!/usr/bin/env node

var assert = require('assert');
var _ = require('lodash');


//
// 基本的な点の確認
//
var dist = {
  foo: 1,
  bar: {
    x: 11,
    y: 22
  },
  baz: [
    111,
    222
  ]
};

var source = {
  foo: 2,
  bar: {
    y: 23,
    z: 33
  },
  baz: [
    112
  ]
};

var merged = _.merge(dist, source);

assert.strictEqual(merged, dist);
assert.deepEqual(dist, {
  foo: 2,
  bar: {
    x: 11,
    y: 23,
    z: 33
  },
  baz: [
    112,
    222
  ]
});


//
// undefined は無視する
//
var dist = [1, 2]
var source = [1, undefined, 3]
assert.deepEqual(_.merge(dist, source), [
  1, 2, 3
]);

var dist = {x:1, y:2};
var source = {x:1, y:undefined, z:3}
assert.deepEqual(_.merge(dist, source), {
  x: 1,
  y: 2,
  z: 3
});
