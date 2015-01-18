/* global module, require */
var request = require('request'),
    URI = require('URIjs');

var SC_CLIENT_ID = 'f43e91eac578ff68472afa2172d987d3';

var streamUrl = function(url) {
    return new URI(url).query(function(data) {
	data.client_id = SC_CLIENT_ID;
    }).toString();
};

var soundcloudRequest = function(url, done) {
    request.get({
	url: url,
	json: true
    }, function (e, r, data) {
	if (e) {
	    done(e, null);
	} else if (data && data.kind === 'playlist') {
	    var items = [];
	    for (var i=0; i<data.tracks.length; i++) {
		var item = {
		    id : data.tracks[i].id,
		    host: 'soundcloud',
		    url: data.tracks[i].permalink_url,
		    stream_url: data.tracks[i].streamable ? streamUrl(data.tracks[i].stream_url) : null,
		    artwork_url: data.tracks[i].artwork_url,
		    title: data.tracks[i].title,
		    duration: Math.round(data.tracks[i].duration / 1000),
		    created_at: data.tracks[i].created_at
		};
		items.push(item);
	    }
	    done(e, items);
	} else if (data && data.kind === 'track') {
	    done(e, [{
		id : data.id,
		host: 'soundcloud',
		url: data.permalink_url,
		stream_url: data.streamable ? streamUrl(data.stream_url) : null,
		artwork_url: data.artwork_url,
		title: data.title,
		duration: Math.round(data.duration / 1000),
		created_at: data.created_at
	    }]);
	} else if (r.statusCode === 404) {
	    done(null, []);
	} else {
	    done('Could not handle soundcloud api response', null);
	}
    });
};

module.exports = function(url, uri, done) {
    var domain = uri.domain(),
	subdomain = uri.subdomain(),
	p1 = uri.segment(0),
	p2 = uri.segment(1),
	p3 = uri.segment(2),
	ext = uri.suffix();
    
    var excludedP1 = ['groups', 'tags', 'pages'];
    var excludedP2 = ['groups', 'dropbox', 'following', 'followers', 'likes', 'comments', 'tracks', 'sets', 'spotlight', 'favorites'];
    var excludedP3 = ['share-options'];

    if (domain === 'soundcloud.com') {
	var apiUrl;
	
	if (subdomain === 'api' && p1 === 'tracks' && p2) {
	    
	    apiUrl = 'http://api.soundcloud.com/tracks/' + p2 + '.json?client_id=' + SC_CLIENT_ID;
	    soundcloudRequest(apiUrl, done);
	    
	} else if (p1 === 'player' && (subdomain === 'w' || subdomain === 'player') && uri.hasQuery('url')) {

	    var playerUrl = new URI(uri.query(true).url).normalize().toString();
	    apiUrl = 'http://api.soundcloud.com/resolve.json?url=' + playerUrl + '&client_id=' + SC_CLIENT_ID;
	    soundcloudRequest(apiUrl, done);

	} else if (subdomain !== 'api' && p2 === 'sets' && !ext && p3) {

	    apiUrl = 'http://api.soundcloud.com/resolve.json?url=' + uri.toString() + '&client_id=' + SC_CLIENT_ID;
	    soundcloudRequest(apiUrl, done);
	    
	} else if (subdomain !== 'api' && excludedP1.indexOf(p1) === -1 && excludedP2.indexOf(p2) === -1 && excludedP3.indexOf(p3) === -1 && !ext && p2) {
	    
	    apiUrl = 'http://api.soundcloud.com/resolve.json?url=' + uri.toString() + '&client_id=' + SC_CLIENT_ID;
	    soundcloudRequest(apiUrl, done);
	    
	} else {
	    done(null, []);
	}
    } else {
	done(null, []);
    }
};
