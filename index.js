'use strict';

function enumAllProps(obj) {
  if (typeof obj !== 'object') {
    return [];
  }

  var keys = [];
  for (var key in obj) {
    keys.push(key);
  }
  return keys;
}

module.exports = enumAllProps;
