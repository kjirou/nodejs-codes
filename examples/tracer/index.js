#!/usr/bin/env node

var assert = require('assert');
var tracer = require('tracer');


// filters
var logger = tracer.colorConsole({
  filters: [function(str){ return str + 'd' }]
});
logger.trace('abc');
