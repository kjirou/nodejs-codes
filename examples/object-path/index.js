#!/usr/bin/env node

var assert = require('assert');
var objectPath = require('object-path');


var obj = {
  foo: 1,
  bar: {
    x: 'a',
    y: [
      100,
      200
    ]
  }
};

assert.strictEqual(objectPath.get(obj, 'foo'), 1);
assert.strictEqual(objectPath.get(obj, 'bar.y.1'), 200);
assert.strictEqual(objectPath.get(obj, 'baz'), undefined);
