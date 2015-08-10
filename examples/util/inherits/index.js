#!/usr/bin/env node

//
// util.inherits
//
//   https://github.com/joyent/node/blob/master/lib/util.js
//

var util = require('util');
var assert = require('assert');


function Super () {
}
Super.prototype.foo = 1;
Super.prototype.getConstructor = function() {
  return this.constructor;
};

function Sub () {
}

function SubSub () {
}

util.inherits(Sub, Super);
util.inherits(SubSub, Sub);


assert(Sub.super_ === Super);
assert(SubSub.super_ === Sub);


var sub = new Sub();

assert(sub.foo === 1);


// this.constructor も変わらない！
(function() {
  var super_ = new Super();
  assert(super_.getConstructor() === Super);

  var sub = new Sub();
  assert(sub.getConstructor() === Sub);

  var subSub = new SubSub();
  assert(subSub.getConstructor() === SubSub);
})();


// オマケ: サブクラスの判定方法
assert(Sub.prototype instanceof Super);
assert(SubSub.prototype instanceof Sub);
assert(SubSub.prototype instanceof Super);
assert(Sub.prototype instanceof Sub === false);
