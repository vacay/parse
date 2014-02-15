/* global require, describe, before, it */
var chai = require("chai"),
    should = chai.should(),
    parse = require('../');

describe('Detecting an 8tracks mix link', function () {
  var items;

  before(function(done) {
    parse('http://8tracks.com/larecreative/jeux-d-eau', function(err, i) {
      items = i;
      done();
    });
  });
    
});