/* global module, require */
var async = require('async'),
    fs = require('fs'),
    path = require('path'),
    URI = require('urijs');

function isURL (text) {
  var pattern = '^(https?:\\/\\/)?' + // protocol
	'((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
	'((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
	'(?::\\d{2,5})?' + // port
	'(?:/[^\\s]*)?$'; // path

  var re = new RegExp(pattern, 'i');
  return re.test(text);
}

module.exports = function(url, callback) {
  var extractors, extractorsDir, extractorsFiles, result, iterator, uri;

  if (!isURL(url))
    return callback('Not a valid url')

  extractorsDir = __dirname + '/lib/extractors';
  extractorsFiles = fs.readdirSync(extractorsDir).sort();
  extractors = [];

  for(var i=0; i<extractorsFiles.length; i++) {
    extractors.push(require(path.join(extractorsDir, extractorsFiles[i])));
  }

  result = [];

  try {
    uri = new URI(url).protocol('http').normalize();
  } catch (e) {
    callback(e, result);
    return;
  }

  iterator = function(extractor, done) {
    extractor.parse(url, uri, function(err, items) {
      result = result.concat(items);
      if (err) err += ' ' + url;
      done(err);
    });
  };

  async.eachSeries(extractors, iterator, function(err) {
    callback(err, result);
  });
};
