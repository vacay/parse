/* global require, describe, before, it */
var chai = require("chai"),
    should = chai.should(),
    parse = require('../');

describe('Analyzing http://s3.amazonaws.com/vcy/production/vitamins/1.mp3', function () {
  var items;

  before(function(done) {
    parse('http://s3.amazonaws.com/vcy/production/vitamins/1.mp3', function(err, i) {
      items = i;
      done();
    });
  });

  it('identify as audio link', function() {
    items.should.have.length(1);
  });

  it('id should be 1.mp3', function() {
    items[0].id.should.equal('1.mp3');
  });

  it('host should be amazonaws', function() {
    items[0].host.should.equal('amazonaws');
  });

  it('permalink should be http://s3.amazonaws.com/vcy/production/vitamins/1.mp3', function() {
    items[0].permalink.should.equal('http://s3.amazonaws.com/vcy/production/vitamins/1.mp3');
  });

  it('stream_url should be http://s3.amazonaws.com/vcy/production/vitamins/1.mp3', function() {
    items[0].stream_url.should.equal('http://s3.amazonaws.com/vcy/production/vitamins/1.mp3');
  });

  it('ext should be mp3', function() {
    items[0].ext.should.equal('mp3');
  });

});