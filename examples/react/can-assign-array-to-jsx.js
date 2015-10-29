//
// Run by babel-node
//

import assert from 'assert';
import React, { Component } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';


class Foo extends Component {

  render() {
    const items = [1, 2].map((v) => {
      return <div key={v}>{v}</div>;
    });
    return <div>{ items }</div>;
  }
}

const fooHtml = renderToStaticMarkup(<Foo />);
assert.strictEqual(fooHtml, '<div><div>1</div><div>2</div></div>');


class Bar extends Component {

  render() {
    return <div>{ [] }</div>;
  }
}

const barHtml = renderToStaticMarkup(<Bar />);
assert.strictEqual(barHtml, '<div></div>');
