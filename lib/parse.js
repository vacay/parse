/* global module, require, __dirname */

var async = require('async'),
    fs = require('fs'),
    path = require('path'),
    URI = require('urijs');

module.exports = function(url, callback) {
    var extractors, extractorsDir, extractorsFiles, result, iterator, uri;
    
    extractorsDir = __dirname + '/extractors';
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
