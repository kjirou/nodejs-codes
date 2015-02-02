#!/usr/bin/env node

//
// require.cache
//
// とりあえず出力してみたけど良くわからん
// 仕様も見つからなかったので諦めたステータス
//

console.log(require.cache);

var assert = require('assert');

console.log(require.cache);

var assert = require('underscore');

console.log(require.cache);
