#!/usr/bin/env node


var assert = require('assert');
var httpErrors = require('http-errors');


var err;


//
// 基本的な使い方
//
// テスト見た方が早かった
// https://github.com/jshttp/http-errors/blob/master/test/test.js
//
err = httpErrors(404);
assert.strictEqual(err.status, 404);
assert.strictEqual(err.statusCode, 404);
assert.strictEqual(err.message, 'Not Found');
assert.strictEqual(err.toString(), 'Error: Not Found');

err = httpErrors(404, 'Custom Message');
assert.strictEqual(err.message, 'Custom Message');


//
// 数値文字列でも指定できる
//
err = httpErrors('200');
err = httpErrors(200);
err = httpErrors('404');
err = httpErrors(404);


//
// 存在しないステータスコードを指定すると 500 と解釈される
//
err = httpErrors(0);
assert.strictEqual(err.status, 500);
err = httpErrors(199);
assert.strictEqual(err.status, 500);
err = httpErrors(9999);
assert.strictEqual(err.status, 500);
