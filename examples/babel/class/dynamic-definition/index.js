#!/usr/bin/env node

require('babel/register');

var assert = require('assert');

//
// 詳細は Foo.js の方を参照
//

var Foo = require('./Foo');

assert.strictEqual(typeof Foo, 'function');
assert.strictEqual(Foo.name, 'Foo');

var foo = new Foo();
assert(foo instanceof Foo);
assert.strictEqual(foo.x, 11);
