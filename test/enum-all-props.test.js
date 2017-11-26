'use strict';

var chai = require('chai');
var expect = chai.expect;

var fav = {}; fav.prop = {}; fav.prop.enumAllProps = require('..');

var enumAllProps = fav.prop.enumAllProps;

describe('fav.prop.enumAllProps', function() {

  it('Should get all props when the argument is a plain object', function() {
    expect(enumAllProps({})).to.have.deep.members([]);
    expect(enumAllProps({ a: 1, b: true, c: 'C' })).to.have.deep.members([
      { key: 'a', value: 1 },
      { key: 'b', value: true },
      { key: 'c', value: 'C' },
    ]);
  });

  it('Should get properties of prototype', function() {
    function Fn0() {}
    Fn0.prototype.a = 1;
    expect(enumAllProps(new Fn0())).to.have.deep.members([
      { key: 'a', value: 1, }
    ]);

    function Fn1() {
      this.b = true;
      this.c = 'C';
    }
    Fn1.prototype = new Fn0();
    Fn1.prototype.d = 'D';
    expect(enumAllProps(new Fn1())).to.have.deep.members([
      { key: 'a', value: 1 },
      { key: 'b', value: true },
      { key: 'c', value: 'C' },
      { key: 'd', value: 'D' },
    ]);
  });

  it('Should get only enumerable props', function() {
    var obj = {};
    Object.defineProperties(obj, {
      a: { enumerable: true, value: 1 },
      b: { value: true },
      c: { value: 'C' },
    });
    expect(enumAllProps(obj)).to.have.deep.members([{ key: 'a', value: 1 }]);
  });

  it('Should return an empty array when the argument is nullish', function() {
    expect(enumAllProps(undefined)).to.have.deep.members([]);
    expect(enumAllProps(null)).to.have.deep.members([]);
  });

  it('Should return an empty array when the argument is primitive type',
  function() {
    expect(enumAllProps(true)).to.have.deep.members([]);
    expect(enumAllProps(false)).to.have.deep.members([]);
    expect(enumAllProps(0)).to.have.deep.members([]);
    expect(enumAllProps(123)).to.have.deep.members([]);
  });

  it('Should return an empty array when the argument is primitive type',
  function() {
    expect(enumAllProps('')).to.have.deep.members([]);
    expect(enumAllProps('abc')).to.have.deep.members([
      { key: '0', value: 'a' },
      { key: '1', value: 'b' },
      { key: '2', value: 'c' },
    ]);

    var s = 'abc';
    try {
      s.aaa = 'AAA';
    } catch (e) {
      // Throws TypeError on Node.js v0.11 or later.
      //console.log(e);
    }
    expect(enumAllProps(s)).to.have.deep.members([
      { key: '0', value: 'a' },
      { key: '1', value: 'b' },
      { key: '2', value: 'c' },
    ]);

    try {
      Object.defineProperty(s, 'bbb', { value: 'BBB' });
    } catch (e) {
      //console.log(e);
    }
    expect(enumAllProps(s)).to.have.deep.members([
      { key: '0', value: 'a' },
      { key: '1', value: 'b' },
      { key: '2', value: 'c' },
    ]);
  });

  it('Should return an array of index strings when the argument is a array',
  function() {
    expect(enumAllProps([])).to.have.deep.members([]);
    expect(enumAllProps([1, 2, 3])).to.have.deep.members([
      { key: '0', value: 1 },
      { key: '1', value: 2 },
      { key: '2', value: 3 },
    ]);

    var a = ['a', 'b'];
    a.aaa = 'AAA';
    expect(enumAllProps(a)).to.have.deep.members([
      { key: '0', value: 'a' },
      { key: '1', value: 'b' },
      { key: 'aaa', value: 'AAA' },
    ]);

    Object.defineProperty(a, 'bbb', { value: 'BBB' });
    expect(enumAllProps(a)).to.have.deep.members([
      { key: '0', value: 'a' },
      { key: '1', value: 'b' },
      { key: 'aaa', value: 'AAA' },
    ]);
  });

  it('Should return an empty string when the argument is a symbol',
  function() {
    if (typeof Symbol !== 'function') {
      this.skip();
      return;
    }

    var symbol = Symbol('foo');
    expect(enumAllProps(symbol)).to.have.deep.members([]);

    try {
      symbol.aaa = 'AAA';
    } catch (e) {
      //console.log('\t', e.message);
    }
    expect(enumAllProps(symbol)).to.have.deep.members([]);

    try {
      Object.defineProperty(symbol, 'bbb', { value: 'BBB' });
    } catch (e) {
      //console.log(e);
    }
    expect(enumAllProps(symbol)).to.have.deep.members([]);
  });
});
