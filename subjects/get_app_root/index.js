#!/usr/bin/env node

//
// package.json の位置を取得したい
//
// 現在の結論: 疎結合にスマートに取得する方法は無い
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
// 一見良さそうだけど、中身を見たら方法がハック的だった。
// https://github.com/inxilpro/node-app-root-path/blob/master/lib/resolve.js
// を見てみると、"/node_modules" の場所から判定しているよう。
//

var fs = require('fs');
var appRoot = require('app-root-path').path;

assert(fs.existsSync(appRoot + '/package.json'));
