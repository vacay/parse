/* global module, require */
var request = require('request'),
    URI = require('URIjs');

var youtubeRequest = function(v, done) {

    if (v.indexOf('%') !== -1) v = v.substring(0, v.indexOf('%'));
    if (v.indexOf('&') !== -1) v = v.substring(0, v.indexOf('&'));

    request.get({
	url: 'https://gdata.youtube.com/feeds/api/videos/' + v + '?' + [
	    'alt=json',
	    'v=2'
	].join('&'),
	json: true
    }, function (e, r, data) {
	if (e) {
	    done(e, data);
	} else if (data && data.entry) {
	    done(e, [{
		id : data.entry.media$group.yt$videoid.$t,
		host: 'youtube',
		url: 'http://www.youtube.com/watch?v=' + v,
		stream_url: null,
		title: data.entry.title.$t,
		duration: data.entry.media$group.yt$duration.seconds,
		created_at: data.entry.published.$t
	    }]);
	} else {
	    done('Youtube api response failed: ' + v, data);
	}
    });
};

module.exports = function(url, uri, done) {
    var domain = uri.domain().toLowerCase(),
	subdomain = uri.subdomain(),
	p1 = uri.segment(0),
	p2 = uri.segment(1);

    if (domain === 'youtube.com' || domain === 'youtube-nocookie.com' || (subdomain === 'youtube' && domain === 'googleapis.com')) {

	if (uri.hasQuery('v')) {
	    youtubeRequest(uri.query(true).v, done);
	} else if ((p1 === 'embed' || p1 === 'v' || p1 === 'e') && p2) {
	    youtubeRequest(p2, done);
	} else {
	    done(null, []);
	}

    } else if (domain === 'youtu.be' && p1) {
	youtubeRequest(p1, done);
    } else {
	done(null, []);
    }
};
