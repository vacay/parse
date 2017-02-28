/* global require, describe, before, it */
var chai = require("chai"),
    should = chai.should(),
    parse = require('../');

describe('Analyzing http://youtube-dl.bandcamp.com/track/youtube-dl-test-song', function () {
    var items;

    before(function(done) {
	parse('http://youtube-dl.bandcamp.com/track/youtube-dl-test-song', function(err, i) {
	    items = i;
	    done();
	});
    });

    it('identify as single bandcamp track', function() {
	items.should.have.length(1);
    });

    it('id should be 1812978515', function() {
	items[0].id.should.equal(1812978515);
    });

    it('host should be bandcamp', function() {
	items[0].host.should.equal('bandcamp');
    });

    it('artwork_url should be https://f1.bcbits.com/img/a3216802731_10.jpg', function() {
	items[0].artwork_url.should.equal('https://f4.bcbits.com/img/a3216802731_10.jpg');
    });

    it('url should be http://youtube-dl.bandcamp.com/track/youtube-dl-test-song', function() {
	items[0].url.should.equal('http://youtube-dl.bandcamp.com/track/youtube-dl-test-song');
    });

    it('there should be a stream_url', function() {
	should.exist(items[0].stream_url);
    });

    it('title should be youtube-dl  \"\'/\\ä↭ - youtube-dl test song \"\'/\\ä↭', function() {
	items[0].title.should.equal('youtube-dl  \"\'/\\ä↭ - youtube-dl test song \"\'/\\ä↭');
    });

    it('duration should be 10', function() {
	items[0].duration.should.equal(10);
    });
});

describe('Analyzing http://blazo.bandcamp.com/album/jazz-format-mixtape-vol-1', function () {
    var items;

    before(function(done) {
	parse('http://blazo.bandcamp.com/album/jazz-format-mixtape-vol-1', function(err, i) {
	    items = i;
	    done();
	});
    });

    it('identify 22 tracks part of a bandcamp album', function() {
	items.should.have.length(22);
    });

    it('should identify artwork as https://f1.bcbits.com/img/a1721150828_10.jpg', function() {
	items[0].artwork_url.should.equal('https://f4.bcbits.com/img/a1721150828_10.jpg');
    });

});
