//
// Run by babel-node
//

import assert from 'assert';
import React, { Component } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';


class Root extends Component {

  render() {
    const items = [1, 2].map((v) => {
      return <div key={v}>{v}</div>;
    });
    return <div>{ items }</div>;
  }
}

const html = renderToStaticMarkup(<Root />);
assert.strictEqual(html, '<div><div>1</div><div>2</div></div>');
