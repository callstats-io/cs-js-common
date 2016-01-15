"use strict";
/*jshint node: true */
/*
Check if an object is a string.
*/
function isString(anObj) {
    return (typeof anObj === 'string' || anObj instanceof String);
}

/*
stringify an object if it is not a string
*/
function stringify (anObj) {
    if (isString(anObj)) {
      return anObj;
    }

    return JSON.stringify(anObj);
}

/**
* check if the value really an boolean value or a string of value 'true'
*/
function isReallyTrue(anObj) {
    if (isString(anObj)) {
        return (anObj.toLowerCase() === 'true');
    }

    return (anObj === true);
}

/*
* check if given origin is in the list of allowed origin
* wildcard (*) in allowed origin is expanded to cover all subdomains
*/
function originMatch(givenOrigin, allowedOrigins) {
    var allowedOriginsList = [], i = 0, origin = "";

    if (allowedOrigins.constructor === Array) {
        allowedOriginsList = allowedOrigins;
    } else {
        allowedOriginsList = [allowedOrigins];
    }
    for (i = allowedOriginsList.length - 1; i >= 0; i--) {
        if (allowedOriginsList[i].indexOf('*') === -1) {
            // no wildcard, so just check if they are same
            if (allowedOriginsList[i] === givenOrigin) {
                return true;
            }
            continue;
        }
        //*.foo.bar matches a.b.c.foo.bar
        origin = "^" + allowedOriginsList[i].replace('*.', "(([a-z0-9][a-z0-9_-]*[a-z0-9]|[a-z0-9]).)+").replace(/\//g, "\\/").replace(/\./g, "\\.") + "$";
        if (new RegExp(origin).test(givenOrigin)) {
            return true;
        }
    }
    return false;
}


module.exports = {
  isString: isString,
  stringify: stringify,
  isReallyTrue: isReallyTrue,
  originMatch: originMatch
};