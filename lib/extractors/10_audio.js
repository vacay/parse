/* global module, require */
var URI = require('URIjs'),
    probe = require('node-ffprobe');

var parse = function(url, uri, done) {
    var domain = uri.domain(),
	ext = uri.suffix();

    if ((ext === 'mp3' || ext === 'wav' || ext === 'mp4' || ext === 'm4a') && domain !== 'dropbox.com') {
	var clone = new URI(uri);
	var directUrl = clone.search('').fragment('').toString();

	probe(directUrl, function (e, data) {

	    if (e) {
		done(null, []);
	    } else {

		var title = data.metadata.artist;
		if (title && data.metadata.title) title += ' - ' + data.metadata.title;
		else if (data.metadata.title) title = data.metadata.title;

		done(null, [{
		    id: uri.filename(),
		    host: domain.split('.').shift(),
		    url: directUrl,
		    stream_url: directUrl,
		    artwork_url: null,
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

module.exports = {
    parse: parse
};
