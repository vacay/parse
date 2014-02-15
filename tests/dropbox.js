/* global require, describe, before, it */
var chai = require("chai"),
    should = chai.should(),
    parse = require('../');

describe('Analyzing https://www.dropbox.com/s/0qr9sai2veej4f8/THE_DOCTOR_GAMES.mp4', function () {
  var items;

  before(function(done) {
    parse('https://www.dropbox.com/s/0qr9sai2veej4f8/THE_DOCTOR_GAMES.mp4', function(err, i) {
      items = i;
      done();
    });
  });
  
  it('identify as dropbox audio link', function() {
    items.should.have.length(1);
  });

  it('should have an id of 0qr9sai2veej4f8', function() {
    items[0].id.should.equal('0qr9sai2veej4f8');
  });

  it('host should be dropbox', function() {
    items[0].host.should.equal('dropbox');
  });

  it('permalink should be http://www.dropbox.com/s/0qr9sai2veej4f8/THE_DOCTOR_GAMES.mp4', function() {
    items[0].permalink.should.equal('http://www.dropbox.com/s/0qr9sai2veej4f8/THE_DOCTOR_GAMES.mp4');
  });

  it('stream url should be http://www.dropbox.com/s/0qr9sai2veej4f8/THE_DOCTOR_GAMES.mp4?dl=1', function() {
    items[0].stream_url.should.equal('http://www.dropbox.com/s/0qr9sai2veej4f8/THE_DOCTOR_GAMES.mp4?dl=1');
  });

  it('title should be THE_DOCTOR_GAMES', function() {
    items[0].title.should.equal('THE_DOCTOR_GAMES');
  });

  it('ext should be mp4', function() {
    items[0].ext.should.equal('mp4');
  });
});