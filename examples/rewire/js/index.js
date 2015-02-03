#!/usr/bin/env node

var assert = require('assert');
var rewire = require('rewire');


//
// rewire で読み込んだ foomodule の検証
//
var foo = rewire('./foomodule/index.js');

// モジュール直下に配置した内部関数が取得できる
var plusOne = foo.__get__('plusOne');
var plusTwo = foo.__get__('plusTwo');
assert.strictEqual(plusOne(1), 2);
assert.strictEqual(plusTwo(1), 3);

// if ブロック内で定義されている内部関数が取得できる
var plusOneInBlock = foo.__get__('plusOneInBlock');
var plusTwoInBlock = foo.__get__('plusTwoInBlock');
assert.strictEqual(plusOneInBlock(1), 2);
assert.strictEqual(plusTwoInBlock(1), 3);

// スコープ内で定義されている内部関数が取得できる
var plusTwoInFunction = foo.__get__('plusTwoInFunction');
assert.strictEqual(plusTwoInFunction(1), 3);

// __dirname が正しい場所を差している
assert.strictEqual(foo.getDirname(), __dirname + '/foomodule');

// 内部で読み込んだ別モジュールで定義されているグローバル変数が反映されている
assert.strictEqual(foo.getAppEnv(), 'dev');

// 内部で読み込んだlodashが読み込めている、npm パッケージ代表として
lodash = foo.getLodash();
assert(typeof lodash === 'function');
assert(lodash.hasOwnProperty('cloneDeep'));

// 内部で読み込んだ barmodule が読み込めている
barmodule = foo.getBarmodule();
assert.strictEqual(barmodule.VALUE, 'value');


//
// barmodule に __set__ してモジュール直下に定義されている変数を操作する
//
var bar = rewire('./barmodule/index.js');

// topVar 変数を修正する
assert.strictEqual(bar.getTopVar(), 'top_var');
var revertBar = bar.__set__('topVar', 'mod_top_var');
assert.strictEqual(bar.__get__('topVar'), 'mod_top_var');
assert.strictEqual(bar.getTopVar(), 'mod_top_var');

// 変数を戻す
// なお、__with__ という自動的に戻す API もある
revertBar();
assert.strictEqual(bar.getTopVar(), 'top_var');
