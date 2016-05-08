/* global module, require */
var URI = require('urijs'),
    probe = require('node-ffprobe');

var parse = function(url, uri, done) {
    var domain = uri.domain(),
	subdomain = uri.subdomain(),
	p1 = uri.segment(0),
	p3 = uri.segment(2);

    if ((p1 === 'post' || p1 === 'audio') && p3 === 'audio_player_iframe' && uri.hasQuery('audio_file')) {
	var audio_file = uri.query(true).audio_file;
	var audio_id = uri.segment(1);
	var stream_url = 'http://a.tumblr.com/' + new URI(audio_file).segment(3) + 'o1.mp3';

	probe(stream_url, function(e, data) {
	    if (e) {
		done(null, []);
	    } else {
		var title = data.metadata.artist;
		if (title && data.metadata.title) title += ' - ' + data.metadata.title;
		else if (data.metadata.title) title = data.metadata.title;

		done(null, [{
		    id : audio_id,
		    host: 'tumblr',
		    url: 'http://' + subdomain + '.' + domain + '/' + p1 + '/' + audio_id,
		    stream_url: stream_url,
		    artwork_url: null,
		    title: title,
		    duration: Math.round(data.format.duration) || 0,
		    created_at: null
		}]);
	    }
	});
    } else {
	done(null, []);
    }
};

module.exports = {
    parse: parse
};
