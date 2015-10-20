//
// Run by babel-node
//

import assert from 'assert';
import React, { Component } from 'react';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';


const Foo = ({ className, content }) => {
  return <div className={className}>{content}</div>;
};

assert.strictEqual(
  renderToStaticMarkup(<Foo className='foo' content='FOO' />),
  '<div class="foo">FOO</div>'
);

assert.strictEqual(
  renderToStaticMarkup(<Foo className='bar' content='BAR' />),
  '<div class="bar">BAR</div>'
);
