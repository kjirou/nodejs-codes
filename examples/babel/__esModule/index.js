#!/usr/bin/env babel-node

//
// __esModule:true の効果
//
// https://babeljs.io/docs/advanced/loose/#es6-modules
//

import assert from 'assert';

import foo, { x } from './foo'
import bar, { y } from './bar'


// exports.default が無いので undefined になる
assert.strictEqual(foo, undefined);
// こちらは設定されているので、その値が返る
assert.strictEqual(bar, 33);

assert.strictEqual(x, 11);
assert.strictEqual(y, 22);
