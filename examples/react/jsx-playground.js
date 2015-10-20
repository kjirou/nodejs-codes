//
// Run by babel-node
//

import assert from 'assert';
import React, { Component } from 'react';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';


class Foo extends Component {
  render() {
    return <div>DIV</div>;
  }
}

assert.strictEqual(renderToStaticMarkup(<Foo />), '<div>DIV</div>');


class Bar extends Component {
  render() {
    return <ul>
      <li className={'templating'} />
      <li className='single' />
      <li className="double" />
    </ul>;
  }
}

assert.strictEqual(
  renderToStaticMarkup(<Bar />),
  '<ul><li class="templating"></li><li class="single"></li><li class="double"></li></ul>'
);
