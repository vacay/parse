/* global module, require, __dirname */

var async = require('async'),
    fs = require('fs'),
    path = require('path'),
    URI = require('URIjs');

var deduplicate = function (arr) {
    var i = 0,
	l = arr.length,
	out = [],
	obj = {};

    for (; i < l; i++) {
	obj[arr[i].host + ' ' + arr[i].identifier] = arr[i];
    }

    for (i in obj) {
	if (obj.hasOwnProperty(i)) out.push(obj[i]);
    }
    return out;
};

module.exports = function(url, callback) {
    var extractors, extract, extractorsDir, extractorsFiles, result, iterator, uri;
    
    extractorsDir = __dirname + '/extractors';
    extractorsFiles = fs.readdirSync(extractorsDir).sort();
    extractors = [];
    
    for(var i=0; i<extractorsFiles.length; i++) {
	extractors.push(require(path.join(extractorsDir, extractorsFiles[i])));
    }
    
    result = [];
    uri = new URI(url).protocol('http').normalize();
    
    iterator = function(extractor, done) {
	extractor(url, uri, function(err, items) {
	    result = result.concat(items);
	    if (err) err += ' ' + url;
	    done(err);
	});
    };
    
    async.eachSeries(extractors, iterator, function(err) {
	callback(err, deduplicate(result));
    });
};
