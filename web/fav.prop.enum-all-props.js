(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g=(g.fav||(g.fav = {}));g=(g.prop||(g.prop = {}));g.enumAllProps = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
