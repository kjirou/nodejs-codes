#!/usr/bin/env node

var mkdirp = require('mkdirp');


mkdirp('./foo/bar', 0755, function(err) {
  if (err) {
    throw err;
  }
  process.exit(0);
});
