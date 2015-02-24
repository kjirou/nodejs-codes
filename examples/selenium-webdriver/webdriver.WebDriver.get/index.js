#!/usr/bin/env node

//
// マニュアル)
// http://selenium.googlecode.com/git/docs/api/javascript/class_webdriver_WebDriver.html#get
//

var assert = require('assert');
var webdriver = require('selenium-webdriver');


var driver = new webdriver.Builder()
  .withCapabilities(webdriver.Capabilities.chrome())
  .build();

// 戻り値の promise は、マニュアルによると
// "A promise that will be resolved when the document has finished loading."
// ってなってるので、読み込みを待つらしい。
driver.get('http://example.com').then(function(){
  // コールバックにレスポンスが入ってるかと思ったけど、入ってなかった
  // ちなみに assert.deepEqual で判定したら怒られる、理由不明
  console.log(arguments); // -> { '0': null }
  return driver.getTitle().then(function(title){
    assert.strictEqual(title, 'Example Domain');
    driver.quit();
  });
});
