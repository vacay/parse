/* global require, describe, before, it */
var chai = require("chai"),
    should = chai.should(),
    parse = require('../');

describe('Analyzing http://tuneage.tumblr.com/post/75185324168/audio_player_iframe/tuneage/tumblr_n0acvsryVS1qz8x4k?audio_file=https%3A%2F%2Fwww.tumblr.com%2Faudio_file%2Ftuneage%2F75185324168%2Ftumblr_n0acvsryVS1qz8x4k&color=white&simple=1', function () {
    var items;

    before(function(done) {
	parse('http://tuneage.tumblr.com/post/75185324168/audio_player_iframe/tuneage/tumblr_n0acvsryVS1qz8x4k?audio_file=https%3A%2F%2Fwww.tumblr.com%2Faudio_file%2Ftuneage%2F75185324168%2Ftumblr_n0acvsryVS1qz8x4k&color=white&simple=1', function(err, i) {
	    items = i;
	    done();
	});
    });

    it('identify as an embedded tumblr track', function() {
	items.should.have.length(1);
    });

    it('should have a id of 75185324168', function() {
	items[0].id.should.equal('75185324168');
    });

    it('should have a url of http://tuneage.tumblr.com/post/75185324168', function() {
	items[0].url.should.equal('http://tuneage.tumblr.com/post/75185324168');
    });

    it('should have a stream_url', function() {
	items[0].stream_url.should.exist;
    });

    it('should have a title of tuneage.tumblr.com/post/75185324168', function() {
	items[0].title.should.equal('Sam Smith - Safe With Me');
    });

});
