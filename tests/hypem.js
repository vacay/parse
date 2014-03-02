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
	items[0].id.should.equal('22ejp');
    });

    it('host should be hypem', function() {
	items[0].host.should.equal('hypem');
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
