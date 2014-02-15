/* global module, require */
var request = require('request'),
    URI = require('URIjs');

module.exports = function(url, uri, done) {
  var domain = uri.domain(),
      subdomain = uri.subdomain(),
      p1 = uri.segment(0),
      p3 = uri.segment(2);

  if ((p1 === 'post' || p1 === 'audio') && p3 === 'audio_player_iframe' && uri.hasQuery('audio_file')) {
    var audio_file = uri.query(true).audio_file;
    var audio_id = uri.segment(1);
    var src = 'http://a.tumblr.com/' + new URI(audio_file).segment(3) + 'o1.mp3';
    done(null, [{
      id : audio_id,
      host: 'tumblr',
      permalink: 'http://' + subdomain + '.' + domain + '/' + p1 + '/' + audio_id,
      stream_url: src,
      title: subdomain + '.' + domain + '/' + p1 + '/' + audio_id,
      duration: null,
      bitrate: null,
      ext: 'mp3',
      created_at: null
    }]);
    
  } else {
    done(null, []);
  }
};