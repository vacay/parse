/* global module, require */
var request = require('request'),
    URI = require('URIjs');

var getPage = function(url, done) {
    request.get(url, function(e, r, body) {
	if (e) {
	    done(e, []);
	    return;
	}

	if (!body || r.statusCode === 404) {
	    done(null, []);
	    return;
	}

	var uri = new URI(url);
	var subdomain = uri.subdomain();
	var track_info = body.match(/trackinfo\s?: (.+),\s*?\n/gi)[0];
	var tracks = JSON.parse('{' + track_info.replace('trackinfo','"trackinfo"').slice(0, - 2) + '}').trackinfo;

	var artFullsizeUrl = body.match(/artFullsizeUrl\s?: (.+),\s*?\n/gi)[0];
	var artwork = JSON.parse('{' + artFullsizeUrl.replace('artFullsizeUrl','"artFullsizeUrl"').slice(0, - 2) + '}').artFullsizeUrl;

	var items = [];
	for (var i=0; i<tracks.length; i++) {
	    if (tracks[i].file) {
		var item = {
		    id : tracks[i].id,
		    host: 'bandcamp',
		    url: new URI(tracks[i].title_link).absoluteTo('http://' + subdomain + '.bandcamp.com/').toString(),
		    stream_url: new URI(tracks[i].file[Object.keys(tracks[i].file)[0]]).absoluteTo('http://').toString(),
		    artwork_url: artwork,
		    title: tracks[i].title,
		    duration: Math.round(tracks[i].duration),
		    created_at: null //TODO: this in the TralbumData object
		};
		items.push(item);
	    }
	}

	done(e, items);
    });
};

var parse = function(url, uri, done) {
    var domain = uri.domain(),
	subdomain = uri.subdomain(),
	p1 = uri.segment(0),
	p2 = uri.segment(1);

    if (domain === 'bandcamp.com' && subdomain && (p1 === 'track' || p1 === 'album') && p2) {
	getPage(url, done);
    } else {
	done(null, []);
    }
};

module.exports = {
    parse: parse
};
