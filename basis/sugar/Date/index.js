#!/usr/bin/env node

assert = require('assert');
require('sugar');


//
// 相対時間を差分の timestamp で取得したかった
//
// ..けど、relative() が返すのはオブジェクトじゃなくて文字列だった
//
// 静的な書式のパーサーに依存しそう、保留。
//
var delta = Date.create('10 minutes before').relative();
assert.strictEqual(typeof delta, 'string');
