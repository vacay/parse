/* global module, require */
var request = require('request'),
    URI = require('URIjs');

module.exports = function(url, uri, done) {
  var domain = uri.domain(),
      p1 = uri.segment(0),
      p2 = uri.segment(1),
      ext = uri.suffix();
  
  var acceptedExts = ['mp3', 'wav', 'mp4', 'm4a'];

  if (acceptedExts.indexOf(ext) >= 0 && domain === 'dropbox.com' && p1 === 's' && p2) {
    done(null, [{
      id : p2,
      host: 'dropbox',
      url: uri.toString(),
      stream_url: uri.toString() + '?dl=1',
      title: uri.filename().split('.').shift(),
      duration: null,
      created_at: null
    }]);
  } else {
    done(null, []);
  }
};
