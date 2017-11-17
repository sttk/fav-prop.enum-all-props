'use strict';

var chai = require('chai');
var expect = chai.expect;

var fav = {}; fav.prop = {}; fav.prop.enumAllProps = require('..');

var enumAllProps = fav.prop.enumAllProps;

describe('fav.prop.enumAllProps', function() {

  it('Should get all props when the argument is a plain object', function() {
    expect(enumAllProps({})).to.deep.equal([]);
    expect(enumAllProps({ a: 1, b: true, c: 'C' })).to.deep
      .equal(['a', 'b', 'c']);
  });

  it('Should get properties of prototype', function() {
    function Fn0() {}
    Fn0.prototype.a = 1;
    expect(enumAllProps(new Fn0())).to.deep.equal(['a']);

    function Fn1() {
      this.b = true;
      this.c = 'C';
    }
    Fn1.prototype = new Fn0();
    Fn1.prototype.d = 'D';
    expect(enumAllProps(new Fn1())).to.deep.equal(['b', 'c', 'd', 'a']);
  });

  it('Should get only enumerable props', function() {
    var obj = {};
    Object.defineProperties(obj, {
      a: { enumerable: true, value: 1 },
      b: { value: true },
      c: { value: 'C' },
    });
    expect(enumAllProps(obj)).to.deep.equal(['a']);
  });

  it('Should return an empty array when the argument is nullish', function() {
    expect(enumAllProps(undefined)).to.deep.equal([]);
    expect(enumAllProps(null)).to.deep.equal([]);
  });

  it('Should return an empty array when the argument is primitive type',
  function() {
    expect(enumAllProps(true)).to.deep.equal([]);
    expect(enumAllProps(false)).to.deep.equal([]);
    expect(enumAllProps(0)).to.deep.equal([]);
    expect(enumAllProps(123)).to.deep.equal([]);
  });

  it('Should return an empty array when the argument is primitive type',
  function() {
    expect(enumAllProps('')).to.deep.equal([]);
    expect(enumAllProps('abc')).to.deep.equal([]);

    var s = 'abc';
    try {
      s.aaa = 'AAA';
    } catch (e) {
      // Throws TypeError on Node.js v0.11 or later.
    }
    expect(enumAllProps(s)).to.deep.equal([]);
  });

  it('Should return an array of index strings when the argument is a array',
  function() {
    expect(enumAllProps([])).to.deep.equal([]);
    expect(enumAllProps([1, 2, 3])).to.deep.equal(['0', '1', '2']);

    var a = ['a', 'b'];
    a.aaa = 'AAA';
    expect(enumAllProps(a)).to.deep.equal(['0', '1', 'aaa']);
  });
});
