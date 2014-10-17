var assert = require('assert');


before(function(done){
  this.foo = 1;
  done();
});

after(function(){
  assert.strictEqual(this.foo, 1);
});

describe('describeと..', function(){
  it('..itが無いと before/after も実行されない', function(){
  });
});
