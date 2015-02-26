#!/usr/bin/env node

//
// __('..') と __("..") をテンプレから探す
//
// という正規表現に先読みが使われていて、実際正しいんだけど読めなかったので検証
//
// /__\((["'])(?:(?=(\\?))\2.)*?\1/g
//

var assert = require('assert');


var matcher = /__\((["'])(?:(?=(\\?))\2.)*?\1\)/g;

[
  '__("abc")',
  '__("abc\"def")',
  '__("abc\"def\"")'
].forEach(function(subject) {
  var result = matcher.exec(subject);
  // .. あれ2番めnullだ
  // そもそも正しくないかもしれないので萎えた
  console.log(result);
});
