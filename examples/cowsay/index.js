#!/usr/bin/env node

var cowsay = require('cowsay');
var assert = require('assert');

var text = cowsay.say({
  text : "I'm a moooodule",
  e : "oO",
  T : "U "
});
console.log(text);
