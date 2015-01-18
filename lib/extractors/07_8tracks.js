/* global module, require */
var request = require('request'),
    async = require('async');

var getPage = function(url, done) {
    request(url, function(e, r, body) {
	var mix = JSON.parse(/PAGE.mix = (.*?);\n/gi.exec(body)[1]);
	
	var session = Math.floor(Math.random() * (1000000000 - 0 + 1) + 0).toString();
	var next_url = 'http://8tracks.com/sets/' + session + '/play?player=sm&format=jsonh&mix_id=' + mix.id;
	
	async.timesSeries(mix.tracks_count, function(n, next) {
	    request.get({
		url: next_url,
		json: true
	    }, function(e1, r1, data) {
		if (e) {
		    next(e, null);
		} else if (data) {
		    var track_data = data.set.track;
		    next_url = 'http://8tracks.com/sets/' + session + '/next?player=sm&format=jsonh&mix_id=' + mix.id + '&track_id=' + track_data.id;
		    next(e, {
			id : track_data.id,
			host: '8tracks',
			url: null,
			stream_url: track_data.track_file_stream_url,
			artwork_url: null,
			title: track_data.performer + ' - ' + track_data.name,
			duration: null,
			created_at: null
		    });
		} else {
		    next('Could not handle 8tracks api response', null);
		}
	    });
	}, function(err, tracks) {
	    done(null, [0]);
	});
    });
};

module.exports = function(url, uri, done) {
    var domain = uri.domain(),
	p1 = uri.segment(0),
	p2 = uri.segment(1);

    if (domain === '8tracks.com' && p1 && p2) {
	//getPage(url, done);
	done(null, []);
    } else {
	done(null, []);
    }
};
