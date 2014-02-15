/* global module, require */
var request = require('request'),
    URI = require('URIjs');

var getPage = function(url, done) {
  request.get({
    url: url,
    jar: true
  }, function(e, r, body) {
    var uri = new URI(url);
    var html_tracks = /<script type="application\/json" id="displayList-data">\s*(.*?)\s*<\/script>/.exec(body)[1];
    var track = JSON.parse(html_tracks).tracks[0];
    var serve_url = 'http://hypem.com/serve/source/' + uri.segment(1) + '/' + track.key;
    request.get({
      url: serve_url,
      jar: true,
      json: true
    }, function(e, r, data) {
      if (e) {
        done(e, data);
      } else if (data) {
        done(e, [{
          id : track.id,
          host: 'hypem',
          permalink: uri.search('').toString(),
          stream_url: data.url,
          title: track.artist + ' - ' + track.song,
          duration: track.time,
          bitrate: null,
          ext: null,
          created_at: new Date(track.ts*1000)
        }]);
      } else {
        done('Could not handle hypem serve source response', []);
      }
    });
  });
};

module.exports = function(url, uri, done) {
  var domain = uri.domain(),
      p1 = uri.segment(0);

  if (domain === 'hypem.com' && p1 === 'track') {
    getPage(url + '?' + encodeURIComponent({'ax': 1, 'ts': Date.now()}), done);
  } else {
    done(null, []);
  }
};