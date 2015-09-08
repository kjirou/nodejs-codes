#!/usr/bin/env node

//
// Can Terminal.app (Mac OS X) accept mouse events?
//
// * click needs "Option" pressing
//

console.log('Start');

process.stdin.setRawMode(true);
process.stdin.resume();

var onData = function onData(aInput) {
  console.log(aInput, aInput.toString());
  if (aInput.toString() === 'q') {
    process.stdin.removeListener('data', onData);
    process.stdin.pause()
    process.exit(0);
  }
};

process.stdin.addListener('data', onData);
