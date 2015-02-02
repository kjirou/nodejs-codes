//
// 変数を describe や it のインスタンス変数として格納した場合、
// そのスコープはどこまでか。
//

var assert = require('assert');


describe('テスト内変数のスコープ', function(){
  before(function(){
    this.foo = 1;
  });

  it('同階層のbeforeで定義したデータが使える', function(){
    assert(this.foo === 1);
  });

  describe('子describeスコープ', function(){
    before(function(){
      this.bar = 2;
    });

    it('親describeのデータが使える', function(){
      assert(this.foo === 1);
    });

    it('当describeのデータが使える', function(){
      assert(this.bar === 2);
    });

    describe('孫describeスコープ', function(){
      before(function(){
        this.bar = 3;
      });

      it('親の親describeのデータが使える', function(){
        assert(this.foo === 1);
      });

      it('当describeによる上書きが勝つ', function(){
        assert(this.bar === 3);
      });
    });
  });
});

describe('別describeスコープ', function(){
  it('別describeのデータは使えない', function(){
    assert(this.foo !== 1);
  });
});
