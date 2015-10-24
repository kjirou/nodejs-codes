//
// Run by babel-node
//

import assert from 'assert';
import React, { Component } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';


class Foo extends Component {

  constructor() {
    super();
    this.state = { content: 'foo0' };
    setTimeout(() => {
      this.setState({ content: 'foo1' });
      this.setState({ content: 'foo2' });
      // 以下でも結果は同じ
      //setTimeout(() => {
      //  this.setState({ content: 'foo2' });
      //}, 1000);
    }, 1000);
  }

  render() {
    console.log('Foo.render:', this.state.content);
    return <div key='foo'>{ this.state.content }</div>;
  }
}

//
// 実行結果
//
// ```
// Root.render
// Foo.render: foo0
// Foo.render: foo1
// Warning: React can't find the root component node for data-reactid value `.kbd4ojzd34`.
// If you're seeing this message, it probably means that you've loaded two copies of React on the page.
// At this time, only a single copy of React can be loaded at a time.
// ```
//
class Root extends Component {
  render() {
    console.log('Root.render');
    return <Foo />;
  }
}


renderToStaticMarkup(<Root />);
