#!/usr/bin/env node

var blessed = require('blessed');


var screen = blessed.screen();

var container = blessed.box({
  top: 'top',
  left: 'left',
  width: '100%',
  height: 10,
  style: {
    fg: 'white',
    bg: 'magenta'
  }
});

var title = blessed.text({
  top: 'top',
  left: 'left',
  height: 1,
  style: {
    fg: 'white',
    bg: 'magenta'
  },
  content: 'Select a stage (Push tab button to switch choice)'
});

var choices = [0, 1, 2].map(function(i) {
  var label = {
    0: 'foo',
    1: 'bar',
    2: 'baz'
  }[i];
  var choice = blessed.button({
    top: 'top',
    left: 'left',
    style: {
      fg: 'white',
      bg: 'magenta'
    },
    content: i + '. ' + label
  });

  return choice;
});

container.append(title);
choices.forEach(function(choice) {
  container.append(choice);
});
screen.append(container);


screen.key(['escape', 'q', 'C-c'], function(ch, key) {
  return process.exit(0);
});


screen.render();
