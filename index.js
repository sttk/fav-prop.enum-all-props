'use strict';

var enumAllKeys = require('@fav/prop.enum-all-keys');

function enumAllProps(obj) {
  var arr = enumAllKeys(obj);
  for (var i = 0, n = arr.length; i < n; i++) {
    var elm = arr[i];
    arr[i] = { key: elm, value: obj[elm] };
  }
  return arr;
}

module.exports = enumAllProps;
