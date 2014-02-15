/* global require, describe, before, it */
var chai = require("chai"),
    should = chai.should(),
    parse = require('../');

describe('Analyzing http://www.youtube.com/watch?v=iODdvJGpfIA', function () {
  var items;

  before(function(done) {
    parse('http://www.youtube.com/watch?v=iODdvJGpfIA', function(err, i) {
      items = i;
      done();
    });
  });
  
  it('identify as a youtube video', function() {
    items.should.have.length(1);
  });

  it('id should be iODdvJGpfIA', function() {
    items[0].id.should.equal('iODdvJGpfIA');
  });

  it('host should be yotube', function() {
    items[0].host.should.equal('youtube');
  });

  it('permalink should be http://www.youtube.com/watch?v=iODdvJGpfIA', function() {
    items[0].permalink.should.equal('http://www.youtube.com/watch?v=iODdvJGpfIA');
  });

  it('title should be Fake Blood - Mars (Original Mix)', function() {
    items[0].title.should.equal('Fake Blood - Mars (Original Mix)');
  });

  it('duration should be 263', function() {
    items[0].duration.should.equal('263');
  });

  it('created_at should be 2008-10-31T18:06:55.000Z', function() {
    var date = new Date('2008-10-31T18:06:55.000Z');
    items[0].created_at.should.equalDate.date;
  });
});