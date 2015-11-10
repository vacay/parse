/* global module, require */
var request = require('requestretry'),
    URI = require('URIjs'),
    soundcloudRequest = require('./02_soundcloud').soundcloud;

var getPage = function(url, done) {
    request({
	url: url,
	jar: true,
	maxAttempts: 3,
	rejectUnauthorized: false
    }, function(e, r, body) {

	var uri = new URI(url);
	var html_tracks = /<script type="application\/json" id="displayList-data">\s*(.*?)\s*<\/script>/.exec(body)[1];
	var track = JSON.parse(html_tracks).tracks[0];
	var serve_url = 'http://hypem.com/serve/source/' + uri.segment(1) + '/' + track.key;

	request({
	    url: serve_url,
	    jar: true,
	    json: true,
	    maxAttempts: 3,
	    rejectUnauthorized: false
	}, function(e, r, data) {

	    if (e) {
		done(e, data);
	    } else if (data) {

		if (data.type === 'SC') {
		    var scId = new URI(data.url).segment(1);
		    var scUrl = 'http://api.soundcloud.com/tracks/' + scId;
		    soundcloudRequest(scUrl, done);
		} else {
		    done(e, [{
			id : track.id,
			host: 'hypem',
			url: uri.search('').toString(),
			stream_url: data.url,
			artwork_url: null,
			title: track.artist + ' - ' + track.song,
			duration: track.time,
			created_at: new Date(track.ts*1000)
		    }]);
		}
	    } else {
		done('Could not handle hypem serve source response', []);
	    }
	});
    });
};

var parse = function(url, uri, done) {
    var domain = uri.domain(),
	p1 = uri.segment(0);

    if (domain === 'hypem.com' && p1 === 'track') {
	getPage(url + '?' + encodeURIComponent({'ax': 1, 'ts': Date.now()}), done);
    } else {
	done(null, []);
    }
};

module.exports = {
    parse: parse
};
