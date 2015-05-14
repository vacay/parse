/* global module, require */
var request = require('request'),
    soundcloudRequest = require('./02_soundcloud').soundcloud,
    youtubeRequest = require('./03_youtube').youtube;

var bopSongRequest = function(url, song_url, done) {
    request.post({
	url: 'https://bop.fm/util/get-song',
	form: {
	    song_url: song_url
	},
	json: true
    }, function(e, r, data) {
	if (e) {
	    done(e, data);
	} else if (data && data.song) {
	    var song = data.song;

	    if (song.soundcloudId) {
		soundcloudRequest(song.soundcloudUrl, done);
	    } else if (song.youtubeId) {
		youtubeRequest(song.youtubeId, done);
	    } else {
		done(null, []);
	    }

	} else {
	    done(null, []);
	}
    });
};

var parse = function(url, uri, done) {
    var domain = uri.domain(),
	p1 = uri.segment(0),
	p2 = uri.segment(1),
	p3 = uri.segment(2);

    if (domain === 'bop.fm' && p1 === 's' && p2 && p3) {
	bopSongRequest(url, p2 + '/' + p3, done);
    } else {
	done(null, []);
    }
};

module.exports = {
    parse: parse
};
