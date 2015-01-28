/* global require, describe, before, it */
var chai = require("chai"),
    should = chai.should(),
    parse = require('../');

chai.use(require('chai-datetime'));

describe('Analyzing http://hypem.com/track/22ejp/TOURIST+-+I+Can\'t+Keep+Up+(feat.+Will+Heard)', function () {
    var items;

    before(function(done) {
	parse("http://hypem.com/track/22ejp/TOURIST+-+I+Can't+Keep+Up+(feat.+Will+Heard)", function(err, i) {
	    items = i;
	    done();
	});
    });

    it('identify as hypem track link', function() {
	items.should.have.length(1);
    });

    it('should have a track id of 22ejp', function() {
	items[0].id.should.equal('134437608');
    });

    it('host should be hypem', function() {
	items[0].host.should.equal('soundcloud');
    });

    it('stream_url should be http://api.soundcloud.com/tracks/134437608/stream?client_id=f43e91eac578ff68472afa2172d987d3', function() {
	items[0].stream_url.should.equal('http://api.soundcloud.com/tracks/134437608/stream?client_id=f43e91eac578ff68472afa2172d987d3');
    });

    it('url should be http://hypem.com/track/22ejp/TOURIST+-+I+Can\'t+Keep+Up+(feat.+Will+Heard)', function() {
	items[0].url.should.equal('http://hypem.com/track/22ejp/TOURIST+-+I+Can\'t+Keep+Up+(feat.+Will+Heard)');
    });

    it('should have a title of TOURIST - I Can\'t Keep Up (feat. Will Heard)', function() {
	items[0].title.should.equal('TOURIST - I Can\'t Keep Up (feat. Will Heard)');
    });

    it('should have a track duration of 271', function() {
	items[0].duration.should.equal(271);
    });

    it('should have a track creation date of Fri Sat, 15 Feb 2014 06:57:56 GMT', function() {
	var date = new Date('Fri Sat, 15 Feb 2014 06:57:56 GMT');
	items[0].created_at.should.equalDate.date;
    });
});

describe('Analyzing http://www.hypem.com/track/22q3z/Hot+Natured+-+Benediction+(Lxury+Remix)', function() {
    var items;

    before(function(done) {
	parse('http://www.hypem.com/track/22q3z/Hot+Natured+-+Benediction+(Lxury+Remix)', function(err, i) {
	    items = i;
	    done();
	});
    });

    it('identify as hypem track link', function() {
	items.should.have.length(1);
    });

    it('should have a track id of 22q3z', function() {
	items[0].id.should.equal('136484279');
    });

    it('host should be hypem', function() {
	items[0].host.should.equal('soundcloud');
    });

    it('stream_url should be http://api.soundcloud.com/tracks/136484279/stream?client_id=f43e91eac578ff68472afa2172d987d3', function() {
	items[0].stream_url.should.equal('http://api.soundcloud.com/tracks/136484279/stream?client_id=f43e91eac578ff68472afa2172d987d3');
    });

    it('url should be http://www.hypem.com/track/22q3z/Hot+Natured+-+Benediction+(Lxury+Remix)', function() {
	items[0].url.should.equal('http://www.hypem.com/track/22q3z/Hot+Natured+-+Benediction+(Lxury+Remix)');
    });

    it('should have a title of Hot Natured - Benediction (Lxury Remix)', function() {
	items[0].title.should.equal('Hot Natured - Benediction (Lxury Remix)');
    });

    it('should have a track duration of 386', function() {
	items[0].duration.should.equal(386);
    });

    it('should have a track creation date of Sun Mar 02 2014 10:43:39 GMT-0500 (EST)', function() {
	var date = new Date('Sun Mar 02 2014 10:43:39 GMT-0500 (EST)');
	items[0].created_at.should.equalDate.date;
    });
});
