/* global module, require */
var request = require('request'),
    URI = require('URIjs');

var SC_CLIENT_ID = 'f43e91eac578ff68472afa2172d987d3';

var streamUrl = function(url) {
    return new URI(url).query(function(data) {
	data.client_id = SC_CLIENT_ID;
	delete data.consumer_key;
    }).toString();
};

var getPage = function(url, done) {
    request.get({
	url: url,
	jar: true
    }, function(e, r, body) {
	var uri = new URI(url);
	var html_tracks = /<script type="application\/json" id="displayList-data">\s*(.*?)\s*<\/script>/.exec(body)[1];
	var track = JSON.parse(html_tracks).tracks[0];
	var serve_url = 'http://hypem.com/serve/source/' + uri.segment(1) + '/' + track.key;
	request.get({
	    url: serve_url,
	    jar: true,
	    json: true
	}, function(e, r, data) {
	    if (e) {
		done(e, data);
	    } else if (data) {
		done(e, [{
		    id : data.type === 'SC' ? new URI(data.url).segment(1)  : track.id,
		    host: data.type === 'SC' ? 'soundcloud' : 'hypem',
		    url: uri.search('').toString(),
		    stream_url: data.type === 'SC' ? streamUrl(data.url) : data.url,
		    artwork_url: null,
		    title: track.artist + ' - ' + track.song,
		    duration: track.time,
		    created_at: new Date(track.ts*1000)
		}]);
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
