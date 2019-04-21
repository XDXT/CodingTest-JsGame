var log = function () {
    console.log.apply(console, arguments);
}

var qs = function(selector) {
  return document.querySelector(selector);
}

var qsa = function(selector) {
  return document.querySelectorAll(selector);
}

var bindEvent = function(element, eventName, callBack) {
    element.addEventListener(eventName, callBack);
}

var bindAll = function(selector, eventName, callBack) {
  var elements = qsa(selector);
  for (var i = 0; i < elements.length; i++) {
    var e = elements[i];
    bindEvent(e, eventName, callBack);
  }
}

var rectIntersects = function(a, b) {
    if (b.y >= a.y && b.y <= a.y + a.h) {
        if (b.x >= a.x && b.x <= a.x + a.w) {
            return true
        }
    }
    return false
}

var isStringInclude = function(base, value) {
  if(base.indexOf(value) == -1 || value == "") {
    return false;
  } else {
    return true;
  }
}

var arrayHas = function(array, value) {
  for (var i = 0; i < array.length; i++) {
    if(value == array[i]) {
      return true;
    }
  }
  return false;
}

var setAttrList = function(obj, attriList, value) {
  for (var i = 0; i < attriList.length; i++) {
    obj[attriList[i]] = value;
  }
}
