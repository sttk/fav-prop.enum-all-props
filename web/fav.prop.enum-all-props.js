(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g=(g.fav||(g.fav = {}));g=(g.prop||(g.prop = {}));g.enumAllProps = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var enumAllKeys = require('@fav/prop.enum-all-keys');
var enumAllSymbols = require('@fav/prop.enum-all-symbols');

function enumAllProps(obj) {
  return enumAllKeys(obj).concat(enumAllSymbols(obj));
}

module.exports = enumAllProps;

},{"@fav/prop.enum-all-keys":2,"@fav/prop.enum-all-symbols":3}],2:[function(require,module,exports){
'use strict';

function enumAllKeys(obj) {
  switch (typeof obj) {
    case 'string': {
      obj = new String(obj);
    }
    case 'object':
    case 'function': {
      var keys = [];
      for (var key in obj) {
        keys.push(key);
      }
      return keys;
    }
    default: {
      return [];
    }
  }
}

module.exports = enumAllKeys;

},{}],3:[function(require,module,exports){
'use strict';

function enumAllSymbols(obj) {
  /* istanbul ignore if */
  if (typeof Symbol !== 'function') {
    return [];
  }

  switch (typeof obj) {
    case 'object': {
      obj = obj || {};
      break;
    }
    case 'function': {
      break;
    }
    default: {
      return [];
    }
  }

  var ret = [];
  while (obj) {
    var symbols = Object.getOwnPropertySymbols(obj);
    for (var i = symbols.length - 1; i >= 0; i--) {
      var descriptor = Object.getOwnPropertyDescriptor(obj, symbols[i]);
      if (!descriptor.enumerable) {
        symbols.splice(i, 1);
      }
    }
    ret = ret.concat(symbols);

    obj = Object.getPrototypeOf(obj);
  }
  return ret;
}

module.exports = enumAllSymbols;

},{}]},{},[1])(1)
});