#!/usr/bin/env node --harmony

//
// Generator (yield) の使用は、0.11 系のいくつかからで、
// 実行時に --harmony オプションが必要になる。
//
// とりあえず、0.11.11 では使えて 0.10.22 では使えなかった。
//

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
