#!/usr/bin/env node

var assert = require('assert');
var uuid = require('uuid');

[0, 1, 2, 3, 4].forEach(function() {
  // v4 だけ、機器や時間などに依存せず、完全にランダムな値から生成する
  // Ref) http://e-words.jp/w/UUID.html
  var id = uuid.v4();
  console.log(id);
});
