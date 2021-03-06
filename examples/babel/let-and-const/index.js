#!/usr/bin/env babel-node

import assert from 'assert';


//
// Can let-var change to const-var?
//

let a = 1;
//const a = 2;  // TypeError: Duplicate declaration "a"

const i = 1;
//i = 2;  // SyntaxError: "i" is read-only

function returnLetVar() {
  let x = 1
  return x;
}
const y = returnLetVar();
assert.strictEqual(y, 1);
//y = 2;  // SyntaxError: "y" is read-only
