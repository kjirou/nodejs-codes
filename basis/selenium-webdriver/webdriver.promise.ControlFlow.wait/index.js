#!/usr/bin/env node

//
// マニュアル)
// http://selenium.googlecode.com/git/docs/api/javascript/class_webdriver_promise_ControlFlow.html#wait
//

var assert = require('assert');
var webdriver = require('selenium-webdriver');


var driver = new webdriver.Builder()
  .withCapabilities(webdriver.Capabilities.chrome())
  .build();

driver.get('http://example.com');
// 引数は (condition, timeout) で、
// condition 関数の戻り値が true になるまで timeout ミリ秒まで実行される。
driver.wait(function(){
  console.log('A');
  // driver.getTitle().then() の戻り値は Promise オブジェクトで、
  // なんでそれが内部の boolean を伝えてくれるのかわからないけど、
  // そうなってるみたい。
  // このオレオレAPIを調べても不毛なので、とりあえず暗記する。
  return driver.getTitle().then(function(title){
    console.log('title =', title);
    return title === 'Example Domain';
  });
}, 5000).then(function(){
  console.log('B');
});
