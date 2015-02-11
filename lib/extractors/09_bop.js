/* global module, require */
var request = require('request'),
    URI = require('URIjs');

var SC_CLIENT_ID = 'f43e91eac578ff68472afa2172d987d3';

var streamUrl = function(url) {
    return new URI(url).query(function(data) {
	data.client_id = SC_CLIENT_ID;
    }).toString();
};


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

		done(null, [{
		    id: song.soundcloudId,
		    host: 'soundcloud',
		    url: song.soundcloudUrl,
		    stream_url: streamUrl(song.soundcloudStreamUrl),
		    artwork_url: song.image,
		    title: song.artist + ' - ' + song.title,
		    duration: Math.round(song.durationMillis / 1000),
		    created_at: null
		}]);
		
	    } else if (song.youtubeId) {

		done(null, [{
		    id: song.youtubeId,
		    host: 'youtube',
		    url: song.youtubeUrl,
		    stream_url: null,
		    artwork_url: song.image,
		    title: song.artist + ' - ' + song.title,
		    duration: Math.round(song.durationMillis / 1000),
		    created_at: null
		}]);

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
