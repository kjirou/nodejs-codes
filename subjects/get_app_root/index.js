#!/usr/bin/env node

//
// package.json の位置を取得したい
//

var assert = require('assert');


//
// require.main.filename を使う方法
//
// こういうのをよく見かけるけど:
//
//   var path = require('path');
//   path.dirname(require.main.filename);
//
// これは、実行したファイルの位置が取れるだけ。
// 例えば、express なら app.js の位置が取れるだけ。
//


//
// 外部モジュールの app-root-path を使う方法
//

var fs = require('fs');
var appRoot = require('app-root-path').path;

assert(fs.existsSync(appRoot + '/package.json'));
