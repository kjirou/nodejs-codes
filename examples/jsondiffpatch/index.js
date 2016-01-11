#!/usr/bin/env node

var assert = require('assert');
var jsondiffpatch = require('jsondiffpatch');


var state = {
  character: {
    name: 'Taro',
    hp: 70
  },
  animation: {
    diffs: []
  }
};

var damages = [5, 5, 5, 15];

var nextState = JSON.parse(JSON.stringify(state));
nextState.character.hp = 60;
