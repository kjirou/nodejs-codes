#!/usr/bin/env node

var assert = require('assert');
var jade = require('jade');


var source = [
'each v, i in list',
'  div #{v},#{i}'
].join('\n');

var fn = jade.compile(source);
var html = fn({ list:['a', 'b', 'c'] });

assert.strictEqual(html, '<div>a,0</div><div>b,1</div><div>c,2</div>');


// #{} と !{}
var source = [
'|#{str}',
'|!{str}'
].join('\n');

var fn = jade.compile(source);
var text = fn({ str:'a&b' });

assert.strictEqual(text, 'a&amp;b\na&b');
