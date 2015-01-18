/* global require, describe, before, it */
var chai = require("chai"),
    should = chai.should(),
    parse = require('../');

describe('Analyzing https://bop.fm/s/mark-ronson/uptown-funk', function () {
    var items;

    before(function(done) {
	parse('https://bop.fm/s/mark-ronson/uptown-funk', function(err, i) {
	    items = i;
	    done();
	});
    });

    it('identify as bop song link', function() {
	items.should.have.length(1);
    });

    it('should have an id of 178349598', function() {
	items[0].id.should.equal('178349598');
    });

    it('host should be soundcloud', function() {
	items[0].host.should.equal('soundcloud');
    });

    it('url should be http://soundcloud.com/radiohotmusic/mark-ronson-uptown-funk-ft-bruno-mars', function() {
	items[0].url.should.equal('http://soundcloud.com/radiohotmusic/mark-ronson-uptown-funk-ft-bruno-mars');
    });

    it('artwork_url should be http://a1.mzstatic.com/us/r30/Music5/v4/82/7e/f1/827ef169-5d4c-cbea-8bad-d872dc52c820/886444933049.1200x1200-75.jpg', function() {
	items[0].artwork_url.should.equal('http://a1.mzstatic.com/us/r30/Music5/v4/82/7e/f1/827ef169-5d4c-cbea-8bad-d872dc52c820/886444933049.1200x1200-75.jpg');
    });

    it('stream url should be https://api.soundcloud.com/tracks/178349598/stream?client_id=f43e91eac578ff68472afa2172d987d3', function() {
	items[0].stream_url.should.equal('https://api.soundcloud.com/tracks/178349598/stream?client_id=f43e91eac578ff68472afa2172d987d3');
    });

    it('title should be Mark Ronson - Uptown Funk', function() {
	items[0].title.should.equal('Mark Ronson - Uptown Funk');
    });

    it('duration should be 292', function() {
	items[0].duration.should.equal(292);
    });

});
