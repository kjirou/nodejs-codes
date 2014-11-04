var assert = require('assert');
var sinon = require('sinon');


describe('sinon & mocha の基本的な使い方', function(){

  //
  // sinon.spy -> sinon.stub -> sinon.mock の順に自由度が高くなるので
  // 基本的には左側から使っていく
  //
  // ほぼ sinon.spy と sinon.stub で事足りるはず
  //
  // ちなみに、外部APIのモックが必要なら nock などの他ライブラリを使う
  //

  // Ref) http://sinonjs.org/docs/#sinonspy
  describe('sinon.spy', function(){

    it('実行回数の調査が出来る', function(){
      var spy = sinon.spy();
      spy();
      spy();
      assert.strictEqual(spy.callCount, 2);
    });

    it('渡された引数の調査が出来る', function(){
      var spy = sinon.spy();

      spy(1, 2);
      spy('a', 'b');

      assert.deepEqual(spy.args, [
        [1, 2],
        ['a', 'b']
      ]);
    });

    it('戻り値の調査が出来る', function(){
      var func = function(x, y){
        return x * y;
      };
      var spy = sinon.spy(func);

      spy(2, 3);
      spy(4, 5);

      assert.deepEqual(spy.args, [
        [2, 3],
        [4, 5]
      ]);
      assert.deepEqual(spy.returnValues, [
        6,
        20
      ]);
    });
  });


  // Ref) http://sinonjs.org/docs/#stubs
  describe('sinon.stub', function(){

    it('インスタンスメソッドの挙動を変更出来る', function(){
      var obj = {
        _x: 5
      };
      obj.func = function(y){
        return this._x * y;
      };

      assert.strictEqual(obj.func(2), 10);

      var stub = sinon.stub(obj, 'func', function(y){
        return this._x * y * 2;
      });

      assert.strictEqual(obj.func(2), 20);
    });
  });


  describe('グローバルオブジェクトのモックをrestoreしたい', function(){

    before(function(){
      this.mocks = [];
    });

    // afterEach または after 内でやらないで it 内で restore しようとすると
    // その it が途中でエラーに成った場合に restore されず、
    // 連鎖的に他のテストもエラーになって追いにくいエラーになってしまうことがある
    afterEach(function(){
      this.mocks.forEach(function(mock){
        mock.restore();
      });
    });

    it('Math.randomの挙動を変更している', function(){
      var originalResult = Math.random();

      assert(0.0 <= originalResult || originalResult < 1.0);

      this.mocks.push(sinon.stub(Math, 'random', function(){
        return 100;
      }));

      assert.strictEqual(Math.random(), 100);
    });

    it('変更したMath.randomの挙動が戻っている', function(){
      var originalResult = Math.random();

      assert(0.0 <= originalResult || originalResult < 1.0);
    });
  });
});
