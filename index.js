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
    } else {
      return JSON.stringify(anObj);
    }
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

module.exports = {
  isString: isString,
  stringify: stringify,
  isReallyTrue: isReallyTrue
};

