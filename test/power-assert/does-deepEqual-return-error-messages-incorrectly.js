var assert = require('power-assert');
//var assert = require('assert');

it('test deepEqual', function() {
  //
  // こういう出力が返るのバグかなと思ったけど、
  // よく考えたら他に出しようが無いから仕方なさそう
  //
  // というか、assert がそうだった。
  //
  // ```
  // 1)  test deepEqual:
  //
  //     AssertionError: [ 10, 100 ] deepEqual [ '10', 101 ]
  //     + expected - actual
  //
  //      [
  //     -  10
  //     -  100
  //     +  "10"
  //     +  101
  //      ]
  // ```
  assert.deepEqual([10, 100], ['10', 101]);
});
