#!/usr/bin/env node

var assert = require('assert');


var iterator = {
};
var iteratable = {
};
iteratable[Symbol.iterator] = function() {
  return iterate;
}


//for (var i = 1; i < 100; i += 1) {
//  if (i % (3 * 5) === 0) {
//    console.log('Fizz Buzz');
//  } else if (i % 3 === 0) {
//    console.log('Fizz');
//  } else if (i % 5 === 0) {
//    console.log('Buzz');
//  } else {
//    console.log(i);
//  }
//}
