#!/usr/bin/env node

var assert = require('assert');


// デフォルトだとキー自体が存在してないみたい
// 最近の記事で process.env.TZ の仕様が見つからないのだが、存在はしてるっぽい？
// Ref) https://github.com/joyent/node/blob/master/test/simple/test-process-env.js#L23
assert('TZ' in process.env === false);


// タイムゾーン設定は有効なのかを試す
process.env.TZ = 'Asia/Tokyo';
var asiaTokyo = new Date(2000, 0, 1);

process.env.TZ = 'America/Los_Angeles';
var americaLos = new Date(2000, 0, 1);

// これが成立してしまう、つまり無効
// 日本の Mac OSX からの結果
// とりあえず、無いものと思った方が良さそう
assert(asiaTokyo.getTime() === americaLos.getTime());
