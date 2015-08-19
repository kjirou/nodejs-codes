#!/usr/bin/env node

var chalk = require('chalk');
var assert = require('assert');


var colored, stripped;

colored = chalk.magenta('1\s2\t3\n4\r5');
console.log(colored);
console.log(JSON.stringify(colored));
console.log(colored.length);

stripped = chalk.stripColor(colored);
console.log(JSON.stringify(stripped));
console.log(stripped.length);
