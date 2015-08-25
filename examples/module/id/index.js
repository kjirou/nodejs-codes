#!/usr/bin/env node

var assert = require('assert');


var fooBarBaz = require('./foo/bar/baz');
var fooBarBazY = require('./foo/bar/baz/y');


// 両方とも絶対パスだった
// 前者は Typically this is the fully resolved filename とのことなので
// module path への指定方法やNODE_PATHで変わるかも
console.log(fooBarBaz.getId());
console.log(fooBarBaz.getFilename());
