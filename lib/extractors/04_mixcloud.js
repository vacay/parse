/* global module, require */
var request = require('request'),
    URI = require('URIjs');

var mixcloudRequest = function(url, stream_url, done) {
    var uri = new URI(url);

    request.get({
	url: 'http://api.mixcloud.com/' + uri.segment(0) + '/' + uri.segment(1) + '/',
	json: true
    }, function(e, r, data) {
	if (e) {
	    done(e, data);
	} else if (data && r.statusCode === 200) {
	    done(e, [{
		id : data.key,
		host: 'mixcloud',
		url: data.url,
		stream_url: stream_url,
		artwork_url: data.pictures.extra_large,
		title: data.name,
		duration: data.audio_length,
		created_at: data.created_time
	    }]);
	} else {
	    done('could not handle mixcloud api response', data);
	}
    });
};

var loadPage = function(url, done) {

    request.get({
	url: url
    }, function(e, r, body) {
	if (e) {
	    done(e, null);
	    return;
	}

	var song_url;
	var page_url = new URI(r.request.uri.href).search('').toString();

	try {
	    var preview_url = body.match(/\s(?:data-preview-url|m-preview)="(.+?)"/gi)[0];
	    preview_url = preview_url.replace(' data-preview-url="', '').replace(' m-preview="', '').slice(0, - 1);
	    song_url = preview_url.replace('/previews/', '/c/originals/');
	} catch(exception) {
	    done(exception, []);
	    return;
	}

	request.head(song_url, function(e, r) {
	    if (r && r.statusCode === 200) {
		mixcloudRequest(page_url, song_url, done);
	    } else {
		song_url = song_url.replace('mp3', 'm4a').replace('originals/', 'm4a/64/');
		request.head(song_url, function(e, r) {
		    if (r && r.statusCode === 200) {
			mixcloudRequest(page_url, song_url, done);
		    } else {
			done(e, []);
		    }
		});
	    }
	});

    });
};

var parse = function(url, uri, done) {
    var domain = uri.domain(),
	subdomain = uri.subdomain(),
	p1 = uri.segment(0),
	p2 = uri.segment(1);

    var excludedP2 = ['favorites', 'listens', 'followers', 'following', 'uploads', 'playlists'];
    var excludedP1 = ['competitions', 'categories', 'tag', 'groups', 'previews', 'widget', 'discover'];

    if (subdomain === 'support') {
	done(null, []);
	return;
    }

    if (domain === 'mixcloud.com') {
	if (subdomain === 'i' && p1) {
	    loadPage(uri.toString(), done);
	} else if (p1 === 'widget' && uri.hasQuery('feed')) {
	    loadPage(uri.query(true).feed, done);
	} else if (p1 && p2 && excludedP1.indexOf(p1) === -1 && excludedP2.indexOf(p2) === -1) {
	    loadPage(uri.toString(), done);
	} else {
	    done(null, []);
	}

    } else {
	done(null, []);
    }
};

module.exports = {
    parse: parse
};
