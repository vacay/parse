/* global module, require */
var URI = require('urijs'),
    probe = require('node-ffprobe');

var parse = function(url, uri, done) {
  var domain = uri.domain(),
      ext = uri.suffix();

  var acceptedExts = ['mp3', 'wav', 'mp4', 'm4a', 'webm', 'oga', 'aac', 'ogg'];

  if (acceptedExts.indexOf(ext) === -1 || domain === 'dropbox.com')
    return done(null, [])


  var clone = new URI(uri);
  var directUrl = clone.search('').fragment('').toString();

  probe(directUrl, function (e, data) {

    if (e)
      return done(null, []);

    var title = data.metadata.artist;
    if (title && data.metadata.title) title += ' - ' + data.metadata.title;
    else if (data.metadata.title) title = data.metadata.title;

    done(null, [{
      id: uri.filename(),
      host: domain.split('.').shift(),
      url: directUrl,
      stream_url: directUrl,
      artwork_url: null,
      title: title || data.filename,
      duration: Math.round(data.format.duration) || 0,
      created_at: null
    }]);
  });
};

module.exports = {
  parse: parse
};
