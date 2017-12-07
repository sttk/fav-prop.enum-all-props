'use strict';

var enumAllKeys = require('@fav/prop.enum-all-keys');
var enumAllSymbols = require('@fav/prop.enum-all-symbols');

function enumAllProps(obj) {
  return enumAllKeys(obj).concat(enumAllSymbols(obj));
}

module.exports = enumAllProps;
