/* global require, describe, before, it */
var chai = require("chai"),
    should = chai.should(),
    parse = require('../');

describe('Analyzing https://soundcloud.com/durante/never-stop', function () {
  var items;

  before(function(done) {
    parse('https://soundcloud.com/durante/never-stop', function(err, i) {
      items = i;
      done();
    });
  });
  
  it('identify as a soundcloud track', function() {
    items.should.have.length(1);
  });

  it('id should be 133393388', function() {
    items[0].id.should.equal(133393388);
  });

  it('host should be soundcloud', function() {
    items[0].host.should.equal('soundcloud');
  });

  it('title should be Lenno - Never Stop (Durante Remix)', function() {
    items[0].title.should.equal('Lenno - Never Stop (Durante Remix)');
  });

  it('permalink should be http://soundcloud.com/durante/never-stop', function() {
    items[0].permalink.should.equal('http://soundcloud.com/durante/never-stop');
  });

  it('stream url should be http://api.soundcloud.com/tracks/133393388/stream?client_id=f43e91eac578ff68472afa2172d987d3', function() {
    items[0].stream_url.should.equal('http://api.soundcloud.com/tracks/133393388/stream?client_id=f43e91eac578ff68472afa2172d987d3');
  });

  it('duration should be 235', function() {
    items[0].duration.should.equal(235);
  });

  it('created_at should be ', function() {
    var date = new Date('2014/02/06 17:14:19 +0000');
    items[0].created_at.should.equalDate.date;
  });
});

describe('Analyzing https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/73653371&amp;auto_play=false&amp;hide_related=false&amp;visual=true', function () {
  var items;

  before(function(done) {
    parse('https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/73653371&amp;auto_play=false&amp;hide_related=false&amp;visual=true', function(err, i) {
      items = i;
      done();
    });
  });
  
  it('identify as a soundcloud embedded track', function() {
    items.should.have.length(1);
  });

  it('id should be 73653371', function() {
    items[0].id.should.equal(73653371);
  });

  it('host should be soundcloud', function() {
    items[0].host.should.equal('soundcloud');
  });

  it('title should be Skrillex - Leaving', function() {
    items[0].title.should.equal('Skrillex - Leaving');
  });

  it('permalink should be http://soundcloud.com/skrillex/skrillex-leaving', function() {
    items[0].permalink.should.equal('http://soundcloud.com/skrillex/skrillex-leaving');
  });

  it('stream url should be http://api.soundcloud.com/tracks/73653371/stream?client_id=f43e91eac578ff68472afa2172d987d3', function() {
    items[0].stream_url.should.equal('http://api.soundcloud.com/tracks/73653371/stream?client_id=f43e91eac578ff68472afa2172d987d3');
  });

  it('duration should be 287', function() {
    items[0].duration.should.equal(287);
  });

  it('created_at should be 2013/01/04 21:27:53 +0000', function() {
    var date = new Date('2013/01/04 21:27:53 +0000');
    items[0].created_at.should.equalDate.date;
  });
});

describe('Analyzing https://soundcloud.com/gottadancedirty/sets/the-dirt-145-toks-colby-j', function () {
  var items;

  before(function(done) {
    parse('https://soundcloud.com/gottadancedirty/sets/the-dirt-145-toks-colby-j', function(err, i) {
      items = i;
      done();
    });
  });
  
  it('identify 10 tracks part of a soundcloud set', function() {
    items.should.have.length(10);
  });

  it('first track should have an id of 132843827', function() {
    items[0].id.should.equal(132843827);
  });

  it('first track host should be soundcloud', function() {
    items[0].host.should.equal('soundcloud');
  });

  it('first track title should be Lancelot - Givin\' It Up (Panda Remix) [Anjunadeep]', function() {
    items[0].title.should.equal('Lancelot - Givin\' It Up (Panda Remix) [Anjunadeep]');
  });

  it('first track permalink should be http://soundcloud.com/itspandauk/lancellot', function() {
    items[0].permalink.should.equal('http://soundcloud.com/itspandauk/lancellot');
  });

  it('first track stream url should be http://api.soundcloud.com/tracks/132843827/stream?client_id=f43e91eac578ff68472afa2172d987d3', function() {
    items[0].stream_url.should.equal('http://api.soundcloud.com/tracks/132843827/stream?client_id=f43e91eac578ff68472afa2172d987d3');
  });

  it('duration should be 257', function() {
    items[0].duration.should.equal(257);
  });

  it('created_at should be 2014/02/03 14:41:41 +0000', function() {
    var date = new Date('2014/02/03 14:41:41 +0000');
    items[0].created_at.should.equalDate.date;
  });
});

describe('Analyzing https://soundcloud.com/jonathan-april', function () {
  var items;

  before(function(done) {
    parse('https://soundcloud.com/jonathan-april', function(err, i) {
      items = i;
      done();
    });
  });
  
  it('ignore soundcloud user links', function() {
    items.should.have.length(0);
  });
});