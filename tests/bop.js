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

    it('should have an id of OPf0YbXqDm0', function() {
	items[0].id.should.equal('OPf0YbXqDm0');
    });

    it('host should be youtube', function() {
	items[0].host.should.equal('youtube');
    });

    it('url should be http://www.youtube.com/watch?v=OPf0YbXqDm0', function() {
	items[0].url.should.equal('http://www.youtube.com/watch?v=OPf0YbXqDm0');
    });

    it('artwork_url should be https://i.ytimg.com/vi/OPf0YbXqDm0/0.jpg', function() {
	items[0].artwork_url.should.equal('https://i.ytimg.com/vi/OPf0YbXqDm0/0.jpg');
    });

    it('stream url should exists', function() {
	should.exist(items[0].stream_url);
    });

    it('title should be Mark Ronson - Uptown Funk ft. Bruno Mars', function() {
	items[0].title.should.equal('Mark Ronson - Uptown Funk ft. Bruno Mars');
    });

    it('duration should be 271', function() {
	items[0].duration.should.equal('271');
    });

});
