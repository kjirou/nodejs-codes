#!/usr/bin/env node

var http = require('http')
var st = require('st')


http.createServer(
  st(process.cwd())
).listen(3000);
