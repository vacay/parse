var parse = require('../lib/parse');

parse(process.argv[2], function(err, results) {
    if (err) {
	console.log(err);
    } else {
	console.log(results);
    }

    process.exit();
});
