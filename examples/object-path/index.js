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
assert.strictEqual(objectPath.get(obj, 'baz.a.b.c'), undefined);

assert.strictEqual(objectPath.has(obj, 'foo'), true);
assert.strictEqual(objectPath.has(obj, 'bar.y.0'), true);
assert.strictEqual(objectPath.has(obj, 'baz'), false);
assert.strictEqual(objectPath.has(obj, 'baz.a.b.c'), false);

objectPath.set(obj, 'foo', 100);
assert.strictEqual(objectPath.get(obj, 'foo'), 100);

objectPath.set(obj, 'baz.a.b.c', 'not_exists');
assert.strictEqual(objectPath.has(obj, 'baz.a.b.c'), true);
