//
// before 内で require したファイルの中で設定した global 変数が
// 他のテストコード内で消えていたことがあった？のでその確認をした。
//
// 結果としてそんなことは無かった。
//

var assert = require('assert');

// settings/index の before 内で global.foo = 1 を
// また before 内で require したファイル内で global.bar = 2 を定義している
require('./settings');

it('グローバル変数が定義されている', function(){
  assert.strictEqual(global.foo, 1);
  assert.strictEqual(foo, 1);
  assert.strictEqual(global.bar, 2);
  assert.strictEqual(bar, 2);
});
