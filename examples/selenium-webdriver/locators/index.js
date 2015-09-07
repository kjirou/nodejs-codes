#!/usr/bin/env node

//
// Test `webdriver.By.css`
//
// http://selenium.googlecode.com/git/docs/api/javascript/namespace_webdriver_By.html#css
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
    return driver.findElements(webdriver.By.css('input'));
  })
  .then(function(elements) {
    console.log('"input" is', elements.length);
  })
  .then(function() {
    return driver.findElements(webdriver.By.css('textarea'));
  })
  .then(function(elements) {
    console.log('"textarea" is', elements.length);
  })
  .then(function() {
    return driver.findElements(webdriver.By.css('input[type="number"]'));
  })
  .then(function(elements) {
    console.log('"input[type="number"]" is', elements.length);
  })
  .then(function() {
    return driver.findElements(webdriver.By.css('input[min="5"]'));
  })
  .then(function(elements) {
    console.log('"input[min="5"]" is', elements.length);
  })
  .then(function() {
    return driver.findElements(webdriver.By.css('input[type="number"][min="5"]'));
  })
  .then(function(elements) {
    console.log('"input[type="number"][min="5"]" is', elements.length);
  })
  .then(function() {
    return driver.findElement({ linkText: 'link-text-wrapped-by-span' });
  })
  .then(function(el) {
    return el.getInnerHtml();
  })
  .then(function(html) {
    console.log('<span>link-text-wrapped-by-span</span> is', html);
  })
  // css の > セレクタ
  .then(function() {
    return driver.findElements({ css: '.a-parent > .a-child' });
  })
  .then(function(els) {
    console.log('".a-parent > .a-child" is ', els.length);
  })
  .then(function() {
    return driver.findElements({ css: '.a-parent > .a-grandchild' });
  })
  .then(function(els) {
    console.log('".a-parent > .a-grandchild" is ', els.length);
  })
  .then(function() {
    driver.quit();
  })
;
