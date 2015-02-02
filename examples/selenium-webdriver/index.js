#!/usr/bin/env node

//
// WebDriverJS
//
// マニュアル) https://code.google.com/p/selenium/wiki/WebDriverJs
// API Docs) http://selenium.googlecode.com/git/docs/api/javascript/index.html
//

var assert = require('assert');
var webdriver = require('selenium-webdriver');


//
// 使いたいブラウザのドライバにパスを通す
//
// マニュアルから引用:
//
//   To get started with WebDriverJS for Node,
//   you will need to download a copy of the ChromeDriver and ensure it can be found on your system PATH.
//   All other browsers can be tested using the stand-alone Selenium server.
//   Once you've obtained the ChromeDriver and placed it on your PATH, you can run your first test:
//
// Chrome は、http://chromedriver.storage.googleapis.com/index.html から取得する。
// または brew install chromedriver <http://brewformulas.org/Chromedriver>
//
// 他のブラウザ全ては、上記引用によると Selenium Server <http://www.seleniumhq.org/download/> で使えるらしい？
// けど、今のところは未検証。
//
var driver = new webdriver.Builder()
  .withCapabilities(webdriver.Capabilities.chrome())
  .build();


//
// Promise オブジェクトを then 内で return すれば
// その終了を待つのかの確認。
//
// 他の環境で、promise がネストしたら動かなかったように見えたため。
//
// 結果としては、ちゃんと動いた。
//

var d = webdriver.promise.defer();
setTimeout(function(){
  console.log('A');
  d.fulfill();
}, 3000);

d.promise.then(function(){
  console.log('B');
  return driver.get('http://example.com').then(function(){
    console.log('C');
  }).then(function(){
    console.log('D');
    return driver.getTitle();
  }).then(function(title){
    console.log('E');
    console.log('title =', title);
    var d2 = webdriver.promise.defer();
    setTimeout(function(){
      console.log('F');
      d2.fulfill();
    }, 2000);
    return d2.promise;
  }).then(function(title){
    console.log('G');
  });
});
