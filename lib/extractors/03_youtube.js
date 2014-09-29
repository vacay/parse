/* global module, require */
var request = require('request'),
    URI = require('URIjs');

var extractData = function(entry) {
    return {
	id : entry.media$group.yt$videoid.$t,
	host: 'youtube',
	url: 'http://www.youtube.com/watch?v=' + entry.media$group.yt$videoid.$t,
	stream_url: null,
	title: entry.title.$t,
	duration: entry.media$group.yt$duration.seconds,
	created_at: entry.published.$t
    };
};

var youtubeRequest = function(id, endpoint, done) {

    if (id.indexOf('%') !== -1) id = id.substring(0, id.indexOf('%'));
    if (id.indexOf('&') !== -1) id = id.substring(0, id.indexOf('&'));

    request.get({
	url: 'https://gdata.youtube.com/feeds/api/' + endpoint + '/' + id + '?' + [
	    'alt=json',
	    'v=2'
	].join('&'),
	json: true
    }, function (e, r, data) {

	if (e) {
	    done(e, data);
	} else if (data && ((data.feed && data.feed.entry) || data.entry)) {

	    var videos = [];
	    if (data.feed && data.feed.entry) {
		for (var i=0; i<data.feed.entry.length; i++) {
		    videos.push(extractData(data.feed.entry[i]));
		}
	    } else {
		videos.push(extractData(data.entry));
	    }

	    done(e, videos);

	} else {
	    done('Youtube ' + endpoint + ' api response failed: ' + id, data);
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
	    youtubeRequest(uri.query(true).v, 'videos', done);
	} else if (p1 === 'embed' && p2 === 'videoseries' && uri.hasQuery('list')) {
	    youtubeRequest(uri.query(true).list, 'playlists', done);
	} else if ((p1 === 'embed' || p1 === 'v' || p1 === 'e') && p2) {
	    youtubeRequest(p2, 'videos', done);
	} else {
	    done(null, []);
	}

    } else if (domain === 'youtu.be' && p1) {
	youtubeRequest(p1, 'videos', done);
    } else {
	done(null, []);
    }
};
