/* global module, require */
var probe = require('node-ffprobe');

module.exports = function(url, uri, done) {
    var domain = uri.domain(),
	p1 = uri.segment(0),
	p2 = uri.segment(1),
	ext = uri.suffix();

    var acceptedExts = ['mp3', 'wav', 'mp4', 'm4a'];

    if (acceptedExts.indexOf(ext) >= 0 && domain === 'dropbox.com' && p1 === 's' && p2) {

	var stream_url = uri.toString() + '?dl=1';

	probe(stream_url, function(e, data) {
	    if (e) {
		done(null, []);
	    } else {
		var title = data.metadata.artist;
		if (title && data.metadata.title) title += ' - ' + data.metadata.title;
		else if (data.metadata.title) title = data.metadata.title;

		done(null, [{
		    id : p2,
		    host: 'dropbox',
		    url: uri.toString(),
		    stream_url: stream_url,
		    title: title,
		    duration: Math.round(data.format.duration),
		    created_at: null
		}]);
	    }
	});
    } else {
	done(null, []);
    }
};
