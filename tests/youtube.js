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

    it('artwork_url should be https://i.ytimg.com/vi/iODdvJGpfIA/0.jpg', function() {
	items[0].artwork_url.should.equal('https://i.ytimg.com/vi/iODdvJGpfIA/0.jpg');
    });

    it('url should be http://www.youtube.com/watch?v=iODdvJGpfIA', function() {
	items[0].url.should.equal('http://www.youtube.com/watch?v=iODdvJGpfIA');
    });

    it('title should be Fake Blood - Mars (Original Mix)', function() {
	items[0].title.should.equal('Fake Blood - Mars (Original Mix)');
    });

    it('duration should be 263', function() {
	items[0].duration.should.equal('263');
    });

});

describe('Analyzing https://www.youtube.com/playlist?list=UUXw-G3eDE9trcvY2sBMM_aA', function () {
    var items;

    before(function(done) {
	parse('https://www.youtube.com/playlist?list=UUXw-G3eDE9trcvY2sBMM_aA', function(err, i) {
	    items = i;
	    done();
	});
    });

    it('identify as a 23 youtube videos', function() {
	items.should.have.length(23);
    });

    it('first video should be 20jY_d5-Evc', function() {
	items[0].id.should.equal('20jY_d5-Evc');
    });

    it('host should be youtube', function() {
	items[0].host.should.equal('youtube');
    });

    it('url should be http://www.youtube.com/watch?v=20jY_d5-Evc', function() {
	items[0].url.should.equal('http://www.youtube.com/watch?v=20jY_d5-Evc');
    });

    it('title should be Beyond The World of Interstellar - A special one-night cinema event', function() {
	items[0].title.should.equal('Beyond The World of Interstellar - A special one-night cinema event');
    });

    it('duration should be 28', function() {
	items[0].duration.should.equal('28');
    });

});
