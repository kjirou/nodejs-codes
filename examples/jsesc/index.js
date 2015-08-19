#!/usr/bin/env node

var jsesc = require('jsesc');
var assert = require('assert');


assert.strictEqual(jsesc('foo'), 'foo');
assert.strictEqual(jsesc('foo bar\r\n\t'), 'foo bar\\r\\n\\t');

console.log(jsesc('あ'));
assert.strictEqual(jsesc('あ'), '\\u3042');
