#!/usr/bin/env node

'use strict';

const assert = require('assert');

class Super {}
class Sub extends Super {}
class SubSub extends Sub {}

assert.strictEqual(Sub.prototype instanceof Super, true);
assert.strictEqual(SubSub.prototype instanceof Super, true);

assert.strictEqual(Super.prototype instanceof Sub, false);
assert.strictEqual(SubSub.prototype instanceof Sub, true);

assert.strictEqual(Super.prototype instanceof SubSub, false);
assert.strictEqual(Sub.prototype instanceof SubSub, false);
