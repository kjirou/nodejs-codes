//
// Run by:
// ----
// $ babel-node index.es6
// ----
//

import assert from 'assert';

import Foo from './foo';
import Bar from './bar';
import Baz from './baz';

console.log('Start');

assert.strictEqual(Foo.getOne(), 1);
assert.strictEqual(Bar.getTwo(), 2);
assert.strictEqual(Baz.getThree(), 3);

console.log('End');
