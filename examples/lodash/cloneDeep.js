#!/usr/bin/env node

var assert = require('assert');
var _ = require('lodash');


//
// Node 4.1 & ES6 by babel な環境で
// cloneDeep が deep copy になってなかったんで単体で調べた
//
// 再現できず
//


var fooData = {
  bar: {
    baz: [1, 2, 3]
  }
};
var complexData = {
  list: _.range(10).map(function(i) {
    return {
      idx: i,
      foo: fooData
    };
  })
};


var cloned = _.cloneDeep(complexData);

console.log(complexData);
console.log(cloned);
cloned.list[0].foo = 1;
console.log(require('util').inspect(cloned, {depth:11}));
