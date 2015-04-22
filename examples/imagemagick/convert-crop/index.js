#!/usr/bin/env node

var assert = require('assert');
var im = require('imagemagick');


// txt: で対象範囲の情報をテキストで取得
im.convert([
  '../support/denzi/Denzi140330-12.png', '-crop', '1x1+0+0', 'txt:'
], function(err, stdout, stderr){
  assert.ifError(err);
  assert.strictEqual(stdout,
    '# ImageMagick pixel enumeration: 1,1,255,srgba\n' +
    '0,0: (0,0,0,1)  #000000  black\n'
  );
});

// 指定範囲を別画像として生成する
// 範囲指定の書式は {width}x{height}+{left}+{top}
im.convert([
  '../support/denzi/Denzi140330-12.png', '-crop', '16x16+0+352', 'tmp/fighter.png'
], function(err, stdout, stderr){
  assert.ifError(err);
  // 標準出力は空
  assert.strictEqual(stdout, '');

  // fighter.png が生成されている
  im.identify('tmp/fighter.png', function(err, features){
    assert.ifError(err);
    assert.strictEqual(features.width, 16);
    assert.strictEqual(features.height, 16);
  });
});
