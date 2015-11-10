/* global module, require */
var probe = require('node-ffprobe');
var request = require('request');

var parse = function(url, uri, done) {
    var domain = uri.domain(),
	p1 = uri.segment(0),
	p2 = uri.segment(1),
	ext = uri.suffix();

    var acceptedExts = ['mp3', 'wav', 'mp4', 'm4a', 'webm', 'oga', 'aac', 'ogg'];

    if (acceptedExts.indexOf(ext) >= 0 && domain === 'dropbox.com' && p1 === 's' && p2) {

	var dropbox_url = uri.search('').toString();

	request({
	    method: 'HEAD',
	    url: dropbox_url + '?dl=1',
	    rejectUnauthorized: false
	}, function(e, response) {

	    if (e) {
		done(null, []);
	    } else {

		done(null, [{
		    id : p2,
		    host: 'dropbox',
		    url: dropbox_url,
		    artwork_url: null,
		    stream_url: dropbox_url + '?dl=1',
		    title: uri.filename(),
		    duration: null,
		    created_at: null
		}]);

		// dropbox cookie/url/probe bug
		return;

		var stream_url = 'https://dl.dropboxusercontent.com' + response.req.path;

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
			    url: dropbox_url,
			    artwork_url: null,
			    stream_url: dropbox_url + '?dl=1',
			    title: title,
			    duration: Math.round(data.format.duration),
			    created_at: null
			}]);
		    }
		});
	    }
	});
    } else {
	done(null, []);
    }
};

module.exports = {
    parse: parse
};
