#!/usr/bin/env node

//
// template tag を抽出できるか
//
// 結論：できた
//

var assert = require('assert');
var webdriver = require('selenium-webdriver');


var TEST_PAGE_FILE_PATH = 'file://' + __dirname + '/test-page.html'

var driver = new webdriver.Builder()
  .withCapabilities(webdriver.Capabilities.chrome())
  .build();

webdriver.promise.fulfilled()
  .then(function() {
    return driver.get(TEST_PAGE_FILE_PATH);
  })

  .then(function() {
    return driver.findElements({ css: '.foo' });
  })
  .then(function(els) {
    console.log(els.length);
  })

  .then(function() {
    return driver.findElements({ css: '.bar' });
  })
  .then(function(els) {
    console.log(els.length);
  })

  .then(function() {
    driver.quit();
  })
;
