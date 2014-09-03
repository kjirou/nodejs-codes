#!/usr/bin/env node --harmony

var assert = require('assert');


//
// Generator 作成は function* で宣言する
//
var createCounter = function*(){
  var count = 1;
  while (true) {
    yield count++;
  }
};


//
// Generator は関数を生成する関数である
//
var counter = createCounter();


var values = [];
for (var i = 0; i < 3; i++) {
  // yield までの実行と値の取得方法
  values.push(counter.next().value);
}

assert(values.join(',') === '1,2,3');
