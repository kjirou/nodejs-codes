#!/usr/bin/env node

//
// Switch active window
//
// getAllWindowHandles:
//   http://selenium.googlecode.com/git/docs/api/javascript/class_webdriver_WebDriver.html#getAllWindowHandles
//
// switchTo:
//   http://selenium.googlecode.com/git/docs/api/javascript/class_webdriver_WebDriver.html#switchTo
//

var assert = require('assert');
var webdriver = require('selenium-webdriver');


var PAGE_1_FILE_PATH = 'file://' + __dirname + '/page-1.html'

var driver = new webdriver.Builder()
  .withCapabilities(webdriver.Capabilities.chrome())
  .build();

webdriver.promise.fulfilled()
  .then(function() {
    return driver.get(PAGE_1_FILE_PATH);
  })
  .then(function() {
    return driver.findElement(webdriver.By.linkText('page-2'));
  })
  .then(function(el) {
    return el.click();
  })
  .then(function() {
    return driver.getPageSource();
  })
  // Browser shows page-2.html, but driver object keeps looking page-1 window
  .then(function(html) {
    assert(html.match('<h1>page-1</h1>'));
  })
  .then(function() {
    return driver.getAllWindowHandles();
  })
  .then(function(windowHandles) {
    // [0] = page-1
    // [1] = page-2
    return driver.switchTo().window(windowHandles[1]);
  })
  .then(function() {
    return driver.getCurrentUrl();
  })
  .then(function(url) {
    assert(url.match('page-2.html$'));
  })
  .then(function() {
    driver.quit();
  })
;
