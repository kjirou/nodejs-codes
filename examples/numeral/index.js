#!/usr/bin/env node

var assert = require('assert');
var numeral = require('numeral');


//
// 桁区切り
//
assert.strictEqual(numeral(1000).format('0,0'), '1,000');
assert.strictEqual(numeral(1000.5).format('0,0.0'), '1,000.5');
assert.strictEqual(numeral(1000.5).format('0,0'), '1,001');
assert.strictEqual(numeral(1000.4).format('0,0'), '1,000');  // 暗黙的には四捨五入になる


//
// 数値文字列でも同じ挙動
//
assert.strictEqual(numeral('1000').format('0,0'), '1,000');
assert.strictEqual(numeral('1000.5').format('0,0.0'), '1,000.5');


//
// '', null, undefined を入れた場合は、0 扱いになるよう
//
assert.strictEqual(numeral('').format('0,0'), '0');
assert.strictEqual(numeral(null).format('0,0'), '0');
assert.strictEqual(numeral(undefined).format('0,0'), '0');
