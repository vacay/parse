/* global module, require */
var request = require('request');
var async = require('async');
var ytdl = require('ytdl-core');

// sorted from worst to best
var YTDL_AUDIO_ENCODINGS = [
    'mp3',
    'aac',
    'vorbis',
    'wav'
];

var getInfo = function(url, cb) {
    var bestFormat;
    var onInfo = function(err, info) {
	if (err) {

	    if (err.toString().indexOf('Error 100') !== -1) {
		cb(null);
		return;
	    }

	    cb(err);
	    return;
	}

	if (info.requires_purchase) {
	    cb(new Error('this YouTube video requires purchase'));
	    return;
	}

	for (var i = 0; i < info.formats.length; i += 1) {
	    var format = info.formats[i];

	    if (format.type.indexOf('audio') === -1) continue;

	    if (bestFormat == null || format.audioBitrate > bestFormat.audioBitrate || (format.audioBitrate === bestFormat.audioBitrate && YTDL_AUDIO_ENCODINGS.indexOf(format.audioEncoding) > YTDL_AUDIO_ENCODINGS.indexOf(bestFormat.audioEncoding))) {
		bestFormat = format;
	    }
	}

	cb(null, {
	    id: info.video_id,
	    host: 'youtube',
	    url: 'http://www.youtube.com/watch?v=' + info.video_id,
	    stream_url: bestFormat ? bestFormat.url : null,
	    artwork_url: 'https://i.ytimg.com/vi/' + info.video_id + '/0.jpg',
	    title: info.title,
	    duration: info.length_seconds,
	    created_at: null
	});
    };

    if (/([0-9A-Za-z_-]{11})/ig.test(url)) url = 'http://www.youtube.com/watch?v=' + url;

    ytdl.getInfo(url, { downloadURL: true }, onInfo);
};

var youtubeVideoRequest = function(id, done) {

    if (id.indexOf('%') !== -1) id = id.substring(0, id.indexOf('%'));
    if (id.indexOf('&') !== -1) id = id.substring(0, id.indexOf('&'));

    getInfo(id, function(err, video) {
	done(err, video ? [video] : []);
    });
};

var getPlaylistIds = function(url, callback) {
    var ids = {};
    request.get({
	url: url
    }, function(e, r, body) {
	if (e) callback(e);
	else {
	    var more;
	    var more_html = body;
	    var content_html = body;

	    async.whilst(function() {
		var ytRE = /href="\s*\/watch\?v=([0-9A-Za-z_-]{11})&amp;[^"]*?index=(\d+)/ig;
		var moreRE = /data-uix-load-more-href="\/?([^"]+)"/ig;

		var match = ytRE.exec(content_html);
		while(match !== null) {
		    if (match[2] !== 0) ids[match[2]] = match[1];
		    match = ytRE.exec(content_html);
		}

		more = moreRE.exec(more_html);
		return !!more;

	    }, function(done) {
		request.get({
		    url: 'https://youtube.com/' + more[1],
		    json: true
		}, function(e, r, body) {
		    if (!e) {
			more_html = body.load_more_widget_html;
			content_html = body.content_html;
			if (!content_html.trim()) more_html = null;
		    }
		    done(e);
		});
	    }, function(err) {
		if (err) callback(err);
		else callback(null, ids);
	    });
	}
    });
};

var youtubePlaylistRequest = function(id, done) {
    getPlaylistIds('https://www.youtube.com/playlist?list=' + id, function(err, result) {
	if (err) {
	    done(err, []);
	} else {
	    var i = 1;
	    var ids = [];
	    while(result[i]) {
		ids.push(result[i]);
		i++;
	    }
	    async.mapLimit(ids, 5, function(id, next) {
		getInfo(id, function(err, video) {
		    next(null, err ? null : video);
		});
	    }, function(err, results) {
		if (err) {
		    done(err, []);
		} else {
		    results = results.filter(function(item) {
			return item;
		    });
		    done(null, results);
		}
	    });
	}
    });
};

var parse = function(url, uri, done) {
    var domain = uri.domain().toLowerCase(),
	subdomain = uri.subdomain(),
	p1 = uri.segment(0),
	p2 = uri.segment(1);

    if (domain === 'youtube.com' || domain === 'youtube-nocookie.com' || (subdomain === 'youtube' && domain === 'googleapis.com')) {

	if (uri.hasQuery('v')) {
	    youtubeVideoRequest(uri.query(true).v, done);
	} else if (p1 === 'embed' && p2 === 'videoseries' && uri.hasQuery('list')) {
	    youtubePlaylistRequest(uri.query(true).list, done);
	} else if (p1 === 'playlist' && uri.hasQuery('list')) {
	    youtubePlaylistRequest(uri.query(true).list, done);
	} else if ((p1 === 'embed' || p1 === 'v' || p1 === 'e') && p2 && p2 !== 'videoseries') {
	    youtubeVideoRequest(p2, done);
	} else {
	    done(null, []);
	}

    } else if (domain === 'youtu.be' && p1) {
	youtubeVideoRequest(p1, done);
    } else {
	done(null, []);
    }
};

module.exports = {
    parse: parse,
    youtube: youtubeVideoRequest
};
