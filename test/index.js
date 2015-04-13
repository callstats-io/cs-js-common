var should = require('chai').should(),
    cs_utils = require('../index');


describe('#isString', function() {
  it('return true for String', function() {
    cs_utils.isString('aString').should.equal(true);
  });

  it('return false for Array', function() {
    cs_utils.isString(['a', 'b']).should.equal(false);
  });

  it('return false for an Object', function() {
    cs_utils.isString({'key': 'value'}).should.equal(false);
  });

  it('return false for a number', function() {
    cs_utils.isString(123).should.equal(false);
  });

});



describe('#stringify', function() {

  var aNumber = 5;
  var aNumberInStr=JSON.stringify(aNumber);

  var anObj =  {"key": "value", "key2":123};
  var anObjInJsonStr = JSON.stringify(anObj);

  it('converts a number into a string', function() {
    cs_utils.stringify(aNumber).should.equal(aNumberInStr);
  });


  it('converts an object into jsonStr', function() {
    cs_utils.stringify(anObj).should.equal(anObjInJsonStr);
  });


  it('If the argument is already a string, don\'t convert further', function() {
    cs_utils.stringify(anObjInJsonStr).should.equal(anObjInJsonStr);
  });


});