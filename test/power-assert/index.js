var async = require('async');
var assert = require('power-assert');


describe('power-assert examples', function() {

  //
  // こういう問題があり
  //
  // https://github.com/kjirou/si_of_sis/issues/81
  //
  // coffee との兼ね合いかなと思ってたら、別環境の生JSでも似たようなことになった
  //
  // んで、単体で再現しようとしたけど無理だった
  //

  //it('非同期', function(done) {
  //  var foo = 1;
  //  assert(foo === 2);
  //  done();
  //});

  //it('in async', function(done) { async.series([
  //    function(next) {
  //      assert(!1);
  //      next();
  //    }
  //  ], done);
  //});

  //it('in try-catch', function(done) {
  //  try {
  //  } catch (err) {
  //  }
  //  assert(!1);
  //  done();
  //});
});
