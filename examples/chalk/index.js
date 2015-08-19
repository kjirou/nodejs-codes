#!/usr/bin/env node

var chalk = require('chalk');
var assert = require('assert');


var colored = chalk.magenta('Hello world!');

console.log(colored);
console.log(JSON.stringify(colored));
