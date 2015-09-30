#!/usr/bin/env babel-node

import assert from 'assert';


const s = new Set();

s
  .add('foo')
  .add('bar')
  .add('baz')
  .add('foo')
;

assert.deepEqual(Array.from(s), ['foo', 'bar', 'baz']);
