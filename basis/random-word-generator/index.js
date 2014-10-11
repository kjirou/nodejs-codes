#!/usr/bin/env node

var assert = require('assert');
var Rwg = require('random-word-generator');


var rwg = new Rwg;

for (var i = 0; i < 1000; i++) {
  var word = rwg.generate();
  console.log(word);
  assert(/^[a-z]{10}$/i.test(word));
}
