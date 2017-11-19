'use strict';

function enumAllProps(obj) {
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

module.exports = enumAllProps;
