/* global module, require */
var request = require('requestretry'),
    URI = require('urijs');

var CLIENT_ID

var streamUrl = function(url) {
  return new URI(url).query(function(data) {
    data.client_id = CLIENT_ID
  }).toString();
};

var soundcloudRequest = function(url, done, run_once) {
  if (CLIENT_ID)
    return soundcloudResolve(url, done, run_once)

  request({
    url: 'https://soundcloud.com/',
    maxAttempts: 2
  }, function(e, r, body) {
    if (e)
      return done(e, []);

    var appJS_regex = /<script\ssrc="(https:\/\/a-v2.sndcdn.com\/assets\/app-[A-Za-z0-9-]*.js)"><\/script>/;
    var appJS_url = body.match(appJS_regex)[1];

    request({
      url: appJS_url,
      maxAttempts: 2
    }, function(e, r, body) {
      if (e)
	return done(e, []);

      var clientID_regex = /client_id:"([0-9A-Za-z]{32})"/;
      CLIENT_ID = body.match(clientID_regex)[1];

      soundcloudResolve(url, done, run_once)
    });
  });
}

var soundcloudResolve = function(url, done, run_once) {
  var apiUrl = 'http://api.soundcloud.com/resolve.json?url=' + url + '&client_id=' + CLIENT_ID;
  request({
    url: apiUrl,
    json: true,
    maxAttempts: 2,
    rejectUnauthorized: false
  }, function (e, r, data) {
    if (e) {
      done(e, []);
    } else if (data && data.kind === 'playlist') {
      var items = [];
      for (var i=0; i<data.tracks.length; i++) {
	var item = {
	  id : data.tracks[i].id,
	  host: 'soundcloud',
	  url: data.tracks[i].permalink_url,
	  stream_url: data.tracks[i].streamable ? streamUrl(data.tracks[i].stream_url) : null,
	  artwork_url: data.tracks[i].artwork_url,
	  title: data.tracks[i].title,
	  duration: Math.round(data.tracks[i].duration / 1000),
	  created_at: data.tracks[i].created_at
	};
	items.push(item);
      }
      done(e, items);
    } else if (data && data.kind === 'track') {
      done(e, [{
	id : data.id,
	host: 'soundcloud',
	url: data.permalink_url,
	stream_url: data.streamable ? streamUrl(data.stream_url) : null,
	artwork_url: data.artwork_url,
	title: data.title,
	duration: Math.round(data.duration / 1000),
	created_at: data.created_at
      }]);
    } else if (r.statusCode === 401) {
      if (run_once) return done(null, [])

      CLIENT_ID = null
      soundcloudRequest(url, done, true)
    } else if (r.statusCode === 403) {
      if (run_once) return done(null, [])

      CLIENT_ID = null
      soundcloudRequest(url, done, true)
    } else if (r.statusCode === 404) {
      done(null, []);
    } else {
      done('Could not handle soundcloud api response: ' + apiUrl, []);
    }
  });
};

var parse = function(url, uri, done) {
  var domain = uri.domain(),
      subdomain = uri.subdomain(),
      p1 = uri.segment(0),
      p2 = uri.segment(1),
      p3 = uri.segment(2),
      ext = uri.suffix();

  var excludedP1 = ['groups', 'tags', 'pages'];
  var excludedP2 = ['groups', 'dropbox', 'following', 'followers', 'likes', 'comments', 'tracks', 'sets', 'spotlight', 'favorites'];
  var excludedP3 = ['share-options'];

  if (domain === 'soundcloud.com') {
    
    if (subdomain === 'api' && p1 === 'tracks' && p2) {

      soundcloudRequest(p2, done);

    } else if (p1 === 'player' && (subdomain === 'w' || subdomain === 'player') && uri.hasQuery('url')) {

      var playerUrl = new URI(uri.query(true).url).normalize().toString();
      if (/api.soundcloud.com\/users\//gi.test(playerUrl)) {
	done(null, []);
	return;
      }
      soundcloudRequest(playerUrl, done);

    } else if (subdomain !== 'api' && p2 === 'sets' && !ext && p3) {

      soundcloudRequest(uri.toString(), done);

    } else if (subdomain !== 'api' && excludedP1.indexOf(p1) === -1 && excludedP2.indexOf(p2) === -1 && excludedP3.indexOf(p3) === -1 && !ext && p2) {

      soundcloudRequest(uri.toString(), done);

    } else {
      done(null, []);
    }

  } else {
    done(null, []);
  }
};

module.exports = {
  parse: parse,
  soundcloud: soundcloudRequest
};
