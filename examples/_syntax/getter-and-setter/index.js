#!/usr/bin/env node

var assert = require('assert');


var obj = {
  _foo: 11,
  get foo() {
    return this._foo;
  },
  set foo(v) {
    this._foo = v;
  }
};

assert.strictEqual(obj.foo, 11);
obj.foo = 12;
assert.strictEqual(obj.foo, 12);
