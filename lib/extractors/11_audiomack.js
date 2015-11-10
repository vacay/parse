/* global module, require */

var request = require('requestretry'),
    async = require('async'),
    soundcloudRequest = require('./02_soundcloud').soundcloud;

var isSoundcloud = /https?:\/\/(?:www\.)?soundcloud\.com\//g;

var audiomackSongRequest = function(url, id, done) {
    request({
	url: 'http://www.audiomack.com/api/music/url/song/' + id + '?extended=1&_=' + new Date().getTime(),
	json: true,
	maxAttempts: 2,
	rejectUnauthorized: false
    }, function(e, r, data) {
	if (e) {
	    done(e, data);
	} else if (data.url) {
	    if (isSoundcloud.test(data.url)) {
		soundcloudRequest(data.url, done);
	    } else {
		done(null, [{
		    id: data.id,
		    host: 'audiomack',
		    url: url,
		    stream_url: data.url,
		    artwork_url: null,
		    title: data.artist + ' - ' + data.title,
		    duration: data.duration,
		    created_at: null
		}]);
	    }
	} else {
	    done(null, []);
	}
    });
};

var audiomackAlbumRequest = function(url, id, done) {
    var count = 0;
    var items = [];
    var getTrack = function(next) {
	request({
	    url: 'http://www.audiomack.com/api/music/url/album/' + id + '/' + count + '/?extended=1&_=' + new Date().getTime(),
	    json: true,
	    maxAttempts: 2,
	    rejectUnauthorized: false
	}, function(e, r, data) {
	    if (e) {
		next(e);
	    } else {
		if (data.url) {
		    if (isSoundcloud.test(data.url)) {

			soundcloudRequest(data.url, function(err, items) {
			    if (err) {
				next(err);
				return;
			    }

			    items = items.concat(items);
			    count++;
			    next();
			});

		    } else {
			var item = {
			    id: data.id,
			    host: 'audiomack',
			    url: url + '#' + count,
			    stream_url: data.url,
			    artwork_url: null,
			    title: data.artist + ' - ' + data.title,
			    duration: data.duration,
			    created_at: null
			};
			items.push(item);
			count++;
			next();
		    }
		} else {
		    next('end of album');
		}
	    }
	});
    };
    
    async.forever(getTrack, function(err) {
	if (!err || err === 'end of album') {
	    done(null, items);
	} else {
	    done(err);
	}
    });
};

var parse = function(url, uri, done) {
    var p2 = uri.segment(1),
	p3 = uri.segment(2);

    var isSong = /https?:\/\/(?:www\.)?audiomack\.com\/song\/([\w/-]+)/g;
    var isAlbum = /https?:\/\/(?:www\.)?audiomack\.com\/album\/([\w/-]+)/g;
    var isSongEmbed = /https?:\/\/(?:www\.)?audiomack\.com\/embed4(?:\-thin|\-large)?\/([\w/-]+)/g;
    var isAlbumEmbed = /https?:\/\/(?:www\.)?audiomack\.com\/embed4-album\/([\w/-]+)/g;

    if (isSong.test(url) || isSongEmbed.test(url)) { // detect song
	audiomackSongRequest(uri.toString(), p2 + '/' + p3, done);
    } else if (isAlbum.test(url) || isAlbumEmbed.test(url)) { //detect album
	audiomackAlbumRequest(uri.toString(), p2 + '/' + p3, done);
    } else {
	done(null, []);
    }

};

module.exports = {
    parse: parse
};
