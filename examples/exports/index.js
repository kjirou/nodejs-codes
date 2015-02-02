#!/usr/bin/env node

//
// exports は辞書としての object を直接返す
//

assert = require('assert');
foo = require('./foo');  // 別ファイルで exports しているモジュール


assert.deepEqual(foo, {
  x: 1,
  y: 2
});
