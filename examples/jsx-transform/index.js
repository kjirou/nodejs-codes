#!/usr/bin/env node

const assert = require('assert');
const jsxTransform = require('jsx-transform');
const { renderToStaticMarkup } = require('react-dom/server');


const jsxSource = `<div x="foo" y={ 2 }>Tekisuto</div>`;

const jsSource = jsxTransform.fromString(jsxSource, {
  factory: 'React.createElement'
});

assert.strictEqual(jsSource, `React.createElement('div', {x: "foo", y: 2 }, ["Tekisuto"])`);
