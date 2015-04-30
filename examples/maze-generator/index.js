#!/usr/bin/env node

var assert = require('assert');
var mazeGenerator = require('maze-generator');


var maze = mazeGenerator([20, 20]);

// 動かん！
// 全部 0 の 2 次元配列が返る
console.log(maze);
