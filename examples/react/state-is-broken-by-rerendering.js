//
// Run by babel-node
//

import assert from 'assert';
import React, { Component } from 'react';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';


//class Foo extends Component {
//  constructor() {
//    super();
//
//    this.state = {
//      counter: 1,
//    };
//  }
//
//  render() {
//    this.state.counter += 1;
//    return <div key="foo">{ this.props.content }</div>;
//  }
//}
//
//class Root extends Component {
//  render() {
//    return <Foo content="FOO" />;
//  }
//}
//
//console.log(renderToStaticMarkup(<Root />));
//assert.strictEqual(renderToStaticMarkup(<Foo />), '<div>DIV</div>');
