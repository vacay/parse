/* global require, describe, before, it */
var chai = require("chai"),
    should = chai.should(),
    parse = require('../');

describe('Analyzing http://soundcloud.com/skrillex/with-you-friends-long-drive', function () {
    var items;

    before(function(done) {
	parse('http://soundcloud.com/skrillex/with-you-friends-long-drive', function(err, i) {
	    items = i;
	    done();
	});
    });

    it('identify as a soundcloud track', function() {
	items.should.have.length(1);
    });

    it('id should be 21792171', function() {
	items[0].id.should.equal(21792171);
    });

    it('host should be soundcloud', function() {
	items[0].host.should.equal('soundcloud');
    });

    it('title should be WITH YOU, FRIENDS (LONG DRIVE)', function() {
	items[0].title.should.equal('WITH YOU, FRIENDS (LONG DRIVE)');
    });

    it('artwork_url should be https://i1.sndcdn.com/artworks-000008793437-pgni6l-large.jpg', function() {
	items[0].artwork_url.should.equal('https://i1.sndcdn.com/artworks-000008793437-pgni6l-large.jpg');
    });

    it('url should be http://soundcloud.com/skrillex/with-you-friends-long-drive', function() {
	items[0].url.should.equal('http://soundcloud.com/skrillex/with-you-friends-long-drive');
    });

    it('stream url should be null', function() {
	should.equal(items[0].stream_url, null);
    });

    it('duration should be 389', function() {
	items[0].duration.should.equal(389);
    });

    it('created_at should be 2011/08/24 15:10:30 +0000', function() {
	var date = new Date('2011/08/24 15:10:30 +0000');
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

    it('url should be http://soundcloud.com/skrillex/skrillex-leaving', function() {
	items[0].url.should.equal('http://soundcloud.com/skrillex/skrillex-leaving');
    });

    it('artwork_url should be https://i1.sndcdn.com/artworks-000037584432-6688t4-large.jpg', function() {
	items[0].artwork_url.should.equal('https://i1.sndcdn.com/artworks-000037584432-6688t4-large.jpg');
    });

    it('stream url should be https://api.soundcloud.com/tracks/73653371/stream?client_id=f43e91eac578ff68472afa2172d987d3', function() {
	items[0].stream_url.should.equal('https://api.soundcloud.com/tracks/73653371/stream?client_id=f43e91eac578ff68472afa2172d987d3');
    });

    it('duration should be 287', function() {
	items[0].duration.should.equal(287);
    });

    it('created_at should be 2013/01/04 21:27:53 +0000', function() {
	var date = new Date('2013/01/04 21:27:53 +0000');
	items[0].created_at.should.equalDate.date;
    });
});

describe('Analyzing http://soundcloud.com/skrillex/sets/scary-monsters-and-nice', function () {
    var items;

    before(function(done) {
	parse('http://soundcloud.com/skrillex/sets/scary-monsters-and-nice', function(err, i) {
	    items = i;
	    done();
	});
    });

    it('identify 9 tracks part of a soundcloud set', function() {
	items.should.have.length(9);
    });

    it('first track should have an id of 21792165', function() {
	items[0].id.should.equal(21792165);
    });

    it('first track host should be soundcloud', function() {
	items[0].host.should.equal('soundcloud');
    });

    it('first track title should be ROCK N\' ROLL (WILL TAKE YOU TO THE MOUNTAIN)', function() {
	items[0].title.should.equal('ROCK N\' ROLL (WILL TAKE YOU TO THE MOUNTAIN)');
    });

    it('first track url should be http://soundcloud.com/skrillex/rock-n-roll-will-take-you-to', function() {
	items[0].url.should.equal('http://soundcloud.com/skrillex/rock-n-roll-will-take-you-to');
    });

    it('first track should have an artwork of https://i1.sndcdn.com/artworks-000008793437-pgni6l-large.jpg', function() {
	items[0].artwork_url.should.equal('https://i1.sndcdn.com/artworks-000008793437-pgni6l-large.jpg');
    });

    it('first track stream url should be null', function() {
	should.equal(items[0].stream_url, null);
    });

    it('duration should be 284', function() {
	items[0].duration.should.equal(284);
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

describe('Analyzing http://soundcloud.com/vicetone/vicetone-lowdown-preview-1/s-jk9Kk', function () {
    var items;

    before(function(done) {
	parse('http://soundcloud.com/vicetone/vicetone-lowdown-preview-1/s-jk9Kk', function(err, i) {
	    items = i;
	    done();
	});
    });

    it('identify as a soundcloud track', function() {
	items.should.have.length(1);
    });

    it('stream url should be https://api.soundcloud.com/tracks/131666915/stream?secret_token=s-jk9Kk&client_id=f43e91eac578ff68472afa2172d987d3', function() {
	items[0].stream_url.should.equal('https://api.soundcloud.com/tracks/131666915/stream?secret_token=s-jk9Kk&client_id=f43e91eac578ff68472afa2172d987d3');
    });
});

describe('Analyzing https://soundcloud.com/electronic-battle-weapon/essential-mix-shadow-child', function () {
    var items, error;

    before(function(done) {
	parse('https://soundcloud.com/electronic-battle-weapon/essential-mix-shadow-child', function(err, i) {
	    error = err;
	    items = i;
	    done();
	});
    });

    it('soundcloud track does not exist', function() {
	items.should.have.length(0);
    });

    it('skip 404 without errors', function() {
	should.not.exist(error);
    });

});
