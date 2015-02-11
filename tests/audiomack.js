/* global require, describe, before, it */
var chai = require("chai"),
    should = chai.should(),
    parse = require('../');

describe('Analyzing http://www.audiomack.com/song/roosh-williams/extraordinary', function () {
    var items;

    before(function(done) {
	parse('http://www.audiomack.com/song/roosh-williams/extraordinary', function(err, i) {
	    items = i;
	    done();
	});
    });

    it('identify as audiomack song link', function() {
	items.should.have.length(1);
    });

    it('should have an id of 310086', function() {
	items[0].id.should.equal('310086');
    });

    it('host should be audiomack', function() {
	items[0].host.should.equal('audiomack');
    });

    it('url should be http://www.audiomack.com/song/roosh-williams/extraordinary', function() {
	items[0].url.should.equal('http://www.audiomack.com/song/roosh-williams/extraordinary');
    });

    it('artwork_url should be null', function() {
	should.equal(items[0].artwork_url, null);
    });

    it('stream_url should exist', function() {
	should.exist(items[0].stream_url);
    });

    it('title should be Roosh Williams - Extraordinary', function() {
	items[0].title.should.equal('Roosh Williams - Extraordinary');
    });

    it('duration should be 0', function() {
	items[0].duration.should.equal(0);
    });

    it('created_at should be null', function() {
	should.equal(items[0].created_at, null);
    });

});
