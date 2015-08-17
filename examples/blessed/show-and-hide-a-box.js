#!/usr/bin/env node

//
// Box の表示と非表示
// またその際にアクティブウィンドウ的な状態が（あれば）どうなるか
//

var blessed = require('blessed');


var screen = blessed.screen({
  debug: true
});
screen.title = 'Show And Hide A Box';

var box = blessed.box({
  top: 'center',
  left: 'center',
  width: '50%',
  height: '50%',
  content: 'Hello {bold}world{/bold}!',
  tags: true,
  border: {
    type: 'line'
  },
  style: {
    fg: 'white',
    bg: 'magenta',
    border: {
      fg: '#f0f0f0'
    },
    hover: {
      bg: 'green'
    }
  }
});
screen.append(box);


box.key('enter', function(ch, key) {
  box.setContent('{right}Even different {black-fg}content{/black-fg}.{/right}\n');
  box.setLine(1, 'bar');
  box.insertLine(1, 'foo');
  screen.render();
});

// Toggle showing or hiding
screen.key('space', function(ch, key) {
  screen.debug('A box is', box.visible ? 'visible' : 'hidden');
  if (box.visible) {
    box.hide();
  } else {
    box.show();
  }
  screen.debug('A box is changed to', box.visible ? 'visible' : 'hidden');
});

// Quit on Escape, q, or Control-C.
screen.key(['escape', 'q', 'C-c'], function(ch, key) {
  return process.exit(0);
});

// Focus our element.
box.focus();

// Render the screen.
screen.render();
