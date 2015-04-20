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

var getStream = function(url, cb) {
    var bestFormat;
    var onInfo = function(err, info) {
	if (err) {
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
	cb(null, bestFormat);
    };

    ytdl.getInfo(url, { downloadURL: true }, onInfo);
};

var extractData = function(entry) {
    return {
	id : entry.media$group.yt$videoid.$t,
	host: 'youtube',
	url: 'http://www.youtube.com/watch?v=' + entry.media$group.yt$videoid.$t,
	stream_url: null,
	artwork_url: 'https://i.ytimg.com/vi/' + entry.media$group.yt$videoid.$t + '/0.jpg',
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
		async.each(data.feed.entry, function(entry, next) {
		    var video = extractData(entry);
		    getStream(video.url, function(err, format) {
			video.stream_url = format ? format.url : null;
			videos.push(video);
			next();
		    });
		}, function() {
		    done(e, videos);
		});
	    } else {
		var video = extractData(data.entry);
		getStream(video.url, function(err, format) {
		    video.stream_url = format ? format.url : null;
		    videos.push(video);
		    done(e, videos);
		});
	    }

	} else {
	    done('Youtube ' + endpoint + ' api response failed: ' + id, data);
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
	    youtubeRequest(uri.query(true).v, 'videos', done);
	} else if (p1 === 'embed' && p2 === 'videoseries' && uri.hasQuery('list')) {
	    youtubeRequest(uri.query(true).list, 'playlists', done);
	} else if ((p1 === 'embed' || p1 === 'v' || p1 === 'e') && p2 && p2 !== 'videoseries') {
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

module.exports = {
    parse: parse,
    youtube: youtubeRequest
};
