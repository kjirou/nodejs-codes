#!/usr/bin/env node

//
// マニュアル)
// http://selenium.googlecode.com/git/docs/api/javascript/class_webdriver_promise_Deferred.html
//

var assert = require('assert');
var webdriver = require('selenium-webdriver');


var driver = new webdriver.Builder()
  .withCapabilities(webdriver.Capabilities.chrome())
  .build();

var d = webdriver.promise.defer();
setTimeout(function(){
  console.log('A');
  d.fulfill();
}, 1000);

// BrowserStack がラップしてる deferred オブジェクトの場合、
// この then 内が実行されなかったので調べた。これだとちゃんと動く。
d.then(function(){
  console.log('B');
  driver.get('http://example.com');
  driver.wait(function(){
    console.log('C');
    return driver.getTitle().then(function(title){
      console.log('title =', title);
      return title === 'Example Domain';
    });
  }, 5000).then(function(){
    console.log('D');
  });
});
