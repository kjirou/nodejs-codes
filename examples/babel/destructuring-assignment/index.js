#!/usr/bin/env babel-node

import assert from 'assert';


function getObj() {
  return {
    x: 2,
    y: 3
  };
}

let {
  x,
  y,
  z = 6
} = getObj();


assert.strictEqual(x, 2);
assert.strictEqual(y, 3);
assert.strictEqual(z, 6);
