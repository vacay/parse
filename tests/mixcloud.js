/* global require, describe, before, it */
var chai = require("chai"),
    should = chai.should(),
    parse = require('../');

chai.use(require('chai-datetime'));

describe('Analyzing https://www.mixcloud.com/johndigweed/transitions-with-john-digweed-and-chymera/', function () {
    var items;

    before(function(done) {
	parse('https://www.mixcloud.com/johndigweed/transitions-with-john-digweed-and-chymera/', function(err, i) {
	    items = i;
	    done();
	});
    });

    it('identify as a mixcloud mix', function() {
	items.should.have.length(1);
    });

    it('should have an id of /johndigweed/transitions-with-john-digweed-and-chymera/', function() {
	items[0].id.should.equal('/johndigweed/transitions-with-john-digweed-and-chymera/');
    });

    it('host should be equal to mixcloud', function() {
	items[0].host.should.equal('mixcloud');
    });

    it('url should be https://www.mixcloud.com/johndigweed/transitions-with-john-digweed-and-chymera/', function() {
	items[0].url.should.equal('https://www.mixcloud.com/johndigweed/transitions-with-john-digweed-and-chymera/');
    });

    it('there should be an artwork_url of http://images-mix.netdna-ssl.com/w/600/h/600/q/85/upload/images/extaudio/875b76c0-c2b0-4dbb-86a8-7b3fa43c77b4.jpg', function() {
	items[0].artwork_url.should.equal('http://images-mix.netdna-ssl.com/w/600/h/600/q/85/upload/images/extaudio/875b76c0-c2b0-4dbb-86a8-7b3fa43c77b4.jpg');
    });

    it('there should be a stream_url', function() {
	should.exist(items[0].stream_url);
    });

    it('duration should be 6938', function() {
	items[0].duration.should.equal(6938);
    });

    it('date should be ', function() {
	var date = new Date('2014-02-13T09:56:51Z');
	items[0].created_at.should.equalDate.date;
    });
});

describe('Analyzing http://i.mixcloud.com/CGSZGD', function () {
    var items;

    before(function(done) {
	parse('http://i.mixcloud.com/CGSZGD', function(err, i) {
	    items = i;
	    done();
	});
    });

    it('identify as a mixclud mix', function() {
	items.should.have.length(1);
    });

    it('should have an id of /johndigweed/transitions-with-john-digweed-and-chymera/', function() {
	items[0].id.should.equal('/johndigweed/transitions-with-john-digweed-and-chymera/');
    });

    it('host should be equal to mixcloud', function() {
	items[0].host.should.equal('mixcloud');
    });

    it('url should be https://www.mixcloud.com/johndigweed/transitions-with-john-digweed-and-chymera/', function() {
	items[0].url.should.equal('https://www.mixcloud.com/johndigweed/transitions-with-john-digweed-and-chymera/');
    });

    it('there should be a stream_url', function() {
	should.exist(items[0].stream_url);
    });

    it('duration should be 6938', function() {
	items[0].duration.should.equal(6938);
    });

    it('date should be ', function() {
	var date = new Date('2014-02-13T09:56:51Z');
	items[0].created_at.should.equalDate.date;
    });
});

describe('Analyzing http://www.mixcloud.com/widget/iframe/?feed=http%3A%2F%2Fwww.mixcloud.com%2Fjohndigweed%2Ftransitions-with-john-digweed-and-chymera%2F&amp%3Bembed_type=widget_standard&amp%3Bembed_uuid=d55f16e2-3542-40a7-9b6f-f395ee5df9b0&amp%3Bhide_tracklist=1&amp%3Bhide_cover=1', function () {
    var items;

    before(function(done) {
	parse('http://www.mixcloud.com/widget/iframe/?feed=http%3A%2F%2Fwww.mixcloud.com%2Fjohndigweed%2Ftransitions-with-john-digweed-and-chymera%2F&amp%3Bembed_type=widget_standard&amp%3Bembed_uuid=d55f16e2-3542-40a7-9b6f-f395ee5df9b0&amp%3Bhide_tracklist=1&amp%3Bhide_cover=1', function(err, i) {
	    items = i;
	    done();
	});
    });

    it('identify as an embedded mixcloud mix', function() {
	items.should.have.length(1);
    });

    it('should have an id of /johndigweed/transitions-with-john-digweed-and-chymera/', function() {
	items[0].id.should.equal('/johndigweed/transitions-with-john-digweed-and-chymera/');
    });

    it('host should be equal to mixcloud', function() {
	items[0].host.should.equal('mixcloud');
    });

    it('url should be https://www.mixcloud.com/johndigweed/transitions-with-john-digweed-and-chymera/', function() {
	items[0].url.should.equal('https://www.mixcloud.com/johndigweed/transitions-with-john-digweed-and-chymera/');
    });

    it('there should be a stream_url', function() {
	should.exist(items[0].stream_url);
    });

    it('duration should be 6938', function() {
	items[0].duration.should.equal(6938);
    });

    it('date should be ', function() {
	var date = new Date('2014-02-13T09:56:51Z');
	items[0].created_at.should.equalDate.date;
    });
});
