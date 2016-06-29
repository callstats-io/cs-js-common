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

describe('#isReallyTrue', function() {
  it('treat true boolean as true', function() {
    cs_utils.isReallyTrue(true).should.equal(true);
  })

  it('treat true string as true', function() {
    cs_utils.isReallyTrue('true').should.equal(true);
    cs_utils.isReallyTrue('True').should.equal(true);
    cs_utils.isReallyTrue('TRUE').should.equal(true);

  })

  it('everything else is not true', function() {
    cs_utils.isReallyTrue('1').should.equal(false);
    cs_utils.isReallyTrue(1).should.equal(false);
    cs_utils.isReallyTrue(null).should.equal(false);
    cs_utils.isReallyTrue(undefined).should.equal(false);

    var someObject = {'a': 'b'};
    cs_utils.isReallyTrue(someObject).should.equal(false);


  })
});

describe("#originMatch", function() {
  it('matches "https://foo.bar.com" to "https://foo.bar.com"', function () {
    cs_utils.originMatch("https://foo.bar.com", "https://foo.bar.com").should.equal(true);
  });

  it('matches "https://foo.bar.com" to "https://foo.bar.com/"', function () {
    cs_utils.originMatch("https://foo.bar.com", "https://foo.bar.com/").should.equal(true);
  });

  it('matches "https://foo.bar.com" to "https://foo.bar.com///"', function () {
    cs_utils.originMatch("https://foo.bar.com", "https://foo.bar.com///").should.equal(true);
  });

  it('does not match "https://foo2.bar.com" to "https://foo.bar.com"', function () {
    cs_utils.originMatch("https://foo2.bar.com", "https://foo.bar.com").should.equal(false);
  });

  it('matches "https://foo.bar.com" to ["https://foo.bar.com"]', function () {
    cs_utils.originMatch("https://foo.bar.com", ["https://foo.bar.com"]).should.equal(true);
  });

  it('matches "https://foo.bar.com" to ["https://bar.com", "https://foo.bar.com"]', function () {
    cs_utils.originMatch("https://foo.bar.com", ["https://bar.com", "https://foo.bar.com"]).should.equal(true);
  });

  it('does not match "https://foo2.bar.com" to ["https://foo.bar.com"]', function () {
    cs_utils.originMatch("https://foo2.bar.com", ["https://foo.bar.com"]).should.equal(false);
  });

  it('does not match "https://foo.bar.company" to "https://foo.bar.com"', function () {
    cs_utils.originMatch("https://foo2.bar.company", "https://foo.bar.com").should.equal(false);
  });

  it('does not match "https://foo.bar.com" to "https://foo.bar.company"', function () {
    cs_utils.originMatch("https://foo2.bar.com", "https://foo.bar.company").should.equal(false);
  });

  it('does not match "https://foo.bar.com" to "https://foo.bar.company"', function () {
    cs_utils.originMatch("https://foo2.bar.com", "https://foo.bar.company").should.equal(false);
  });

  it('matches "https://foo2.bar.com" to "https://*.bar.com"', function () {
    cs_utils.originMatch("https://foo2.bar.com", "https://*.bar.com").should.equal(true);
  });

  it('matches "https://foo2.2.bar.com" to "https://*.bar.com"', function () {
    cs_utils.originMatch("https://foo2.2.bar.com", "https://*.bar.com").should.equal(true);
  });

  it('does not match "https://foo2.2-.bar.com" to "https://*.bar.com"', function () {
    cs_utils.originMatch("https://foo2.2-.bar.com", "https://*.bar.com").should.equal(false);
  });

  it('does not match "https://foo.bar.company" to "https://*.bar.com"', function () {
    cs_utils.originMatch("https://foo.bar.company", "https://*.bar.com").should.equal(false);
  });


});