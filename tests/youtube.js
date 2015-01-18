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

    it('created_at should be 2008-10-31T18:06:55.000Z', function() {
	var date = new Date('2008-10-31T18:06:55.000Z');
	items[0].created_at.should.equalDate.date;
    });
});

describe('Analyzing http://www.youtube.com/embed/videoseries?list=PLpl1Jk0Vplb-lrkbPDcI89qlolGqrc8ah', function () {
    var items;

    before(function(done) {
	parse('http://www.youtube.com/embed/videoseries?list=PLpl1Jk0Vplb-lrkbPDcI89qlolGqrc8ah', function(err, i) {
	    items = i;
	    done();
	});
    });

    it('identify as a youtube video', function() {
	items.should.have.length(15);
    });

    it('first video should be UpRssA0CQ0E', function() {
	items[0].id.should.equal('UpRssA0CQ0E');
    });

    it('host should be youtube', function() {
	items[0].host.should.equal('youtube');
    });

    it('url should be http://www.youtube.com/watch?v=UpRssA0CQ0E', function() {
	items[0].url.should.equal('http://www.youtube.com/watch?v=UpRssA0CQ0E');
    });

    it('title should be LOUDPVCK & GLADIATOR feat. Nipsey Hussle - Tony (Official Video)', function() {
	items[0].title.should.equal('LOUDPVCK & GLADIATOR feat. Nipsey Hussle - Tony (Official Video)');
    });

    it('duration should be 156', function() {
	items[0].duration.should.equal('156');
    });

    it('created_at should be 2014-09-11T15:07:35.000Z', function() {
	var date = new Date('2014-09-11T15:07:35.000Z');
	items[0].created_at.should.equalDate.date;
    });
});
