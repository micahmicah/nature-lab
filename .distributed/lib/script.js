var cat = require('catw');
var findit = require('findit');
var through = require('through2');
var browserify = require('browserify');

module.exports = scriptBundle;

function scriptBundle (root) {
    var libPath = root + '/static/script/lib/';
    var scriptPath = root + '/static/script/index.js';
    
    var b = browserify();

    b.add(scriptPath);

    return b.bundle();

    function lib (path) {
        var t = through();

        cat(path + '*.js', function (stream) {
            stream.pipe(t);
        });

        return t;
    }

    function stringify () {
        return through(function (row, enc, next) {
            this.push(row.toString());
            next();
        });
    }
}