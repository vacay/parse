/* global module, require */
var request = require('request'),
    URI = require('URIjs');

module.exports = function(url, uri, done) {
  var domain = uri.domain(),
      ext = uri.suffix();

  if ((ext === 'mp3' || ext === 'wav' || ext === 'mp4' || ext === 'm4a') && domain !== 'dropbox.com') {
    var clone = new URI(uri);
    var directUrl = clone.search('').fragment('').toString();
    request.head(directUrl, function (e, r) {
      //TODO: do a get & parse id3 for more info
      if (r && r.statusCode === 200) {
        done(null, [{
          id: uri.filename(),
          host: domain.split('.').shift(),
          url: directUrl,
          stream_url: directUrl,
          title: uri.filename(),
          duration: null,
          created_at: null
        }]);
      } else {
        done(null, []);
      }
    });
  } else {
    done(null, []);
  }
};
