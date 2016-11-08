#!/usr/bin/env node

var assert = require('assert');
var fs = require('fs');
var tv4 = require('tv4');

var metaSchema = JSON.parse(
  fs.readFileSync(__dirname + '/../../node_modules/json-schema/draft-04/schema').toString()
);
console.log(metaSchema);

//
// 現在、バグで本家のメタスキーマを解釈出来ない模様
// https://github.com/geraintluff/tv4/issues/198
//
(function() {
  var schema = {
    type: 'number',
  };
  var validated = tv4.validateMultiple(schema, metaSchema);
  console.log(validated);
})();
