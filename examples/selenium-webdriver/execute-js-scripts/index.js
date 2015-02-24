#!/usr/bin/env node

var assert = require('assert');
var webdriver = require('selenium-webdriver');


var driver = new webdriver.Builder()
  .withCapabilities(webdriver.Capabilities.chrome())
  .build();

driver.get('http://example.com').then(function(){
  return driver.getTitle();
}).then(function(title){
  assert.strictEqual(title, 'Example Domain');
}).then(function(){
  // executeScript を使う
  // ちなみに、主にこれはJSエラーを拾う場合に必要になるが、その場合は
  // window.onerror でフックする
  return driver.executeScript('return ["a", "b", "c"];');
}).then(function(result){
  assert.strictEqual(result.join('|'), 'a|b|c');
}).then(function(){
  driver.quit();
});
