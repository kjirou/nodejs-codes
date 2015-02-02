#!/usr/bin/env node


var jade = require('jade');
var fs = require('fs');
var assert = require('assert');


var templateFilePath = './parent.jade';
var templateText = fs.readFileSync(templateFilePath);
var template = jade.compile(templateText, {
  filename: templateFilePath,
  pretty: true
});
var html = template();

console.log(html);

assert(/Parent/.test(html));
assert(/Child/.test(html));
