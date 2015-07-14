var assert = require('assert');


describe('新しいAssertionErrorの表示', function(){
  it('strictEqual', function(){
    assert.strictEqual('abc', 'abd');
  });

  it('deepEqual', function(){
    assert.strictEqual([1, 2, 3], [1, 2, 4]);
  });
});
