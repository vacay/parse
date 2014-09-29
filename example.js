/* global require, process */

var parse = require('./index');
var url = 'http://www.youtube.com/embed/videoseries?list=PLpl1Jk0Vplb-lrkbPDcI89qlolGqrc8ah';

parse(url, function(err, results) {

    if (err) console.log(err);

    console.log(results);

    process.exit(0);

});
