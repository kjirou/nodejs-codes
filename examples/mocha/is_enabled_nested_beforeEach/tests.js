//
// 案件環境(v1.21使用)で出たバグっぽい挙動の検証
//
// Coffeeで書かれた tests.coffee がこういう構造:
//
//   describe 1
//     beforeEach 1
//     describe 2
//       describe 3
//         beforeEach 3
//         it 'foo'
//
// その中で、三重ネスト先の foo テストケースのみを grep で実行した時:
//
//   mocha path/to/tests.coffee --grep foo
//
// beforeEach 1 が実行されてなかった
//
//
// 結論：
//
//  2.2で確認したら想定通りに親の全beforeEachを実行していた
//  案件環境は諦める
//

var assert = require('assert');


describe('nest 1', function(){
  beforeEach(function(){
    this.foo = 'foo';
  });

  describe('nest 2', function(){
    beforeEach(function(){
      this.bar = 'bar';
    });

    describe('nest 3', function(){
      beforeEach(function(){
        this.baz = 'baz';
      });

      it('baz', function(){
        //
        // 以下を実行すると
        //
        //   mocha ./tests.js --grep baz
        //
        // "foo bar baz" になる
        //
        console.log(this.foo, this.bar, this.baz);
      });
    });
  });
});
