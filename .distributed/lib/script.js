var cat = require('catw');
var findit = require('findit');
var through = require('through2');
var browserify = require('browserify');
var brfs = require('brfs');

module.exports = scriptBundle;

function scriptBundle (root) {
    var libPath = root + '/static/script/lib/';
    var scriptPath = root + '/static/script/index.js';

    return lib(libPath).pipe(script(scriptPath));

    function lib (path) {
        var t = through();
        var data = [];

        cat(path + '*.js', function (stream) {
            stream.on('data', function (d) {
                data.push(d);
            });
            stream.on('end', function () {
                t.push(data.join(''));
                t.push(null);
            });
        });

        return t;
    }

    function script (path) {
        var b = browserify();
        b.add(path);
        b.transform(brfs);
        var data = [];

        return through(write, end);

        function write (row, enc, next) {
            data.push(row);
            next();
        }

        function end () {
            var self = this;
            b.bundle()
                .on('data', function (d) {
                    data.push(d);
                })
                .on('end', function () {
                    self.push(data.join(''));
                    self.push(null);
                });
        }
    }

    function loggify () {
        return through(function (row, enc, next) {
            console.log(row);
            this.push(row);
            next();
        });
    }

    function stringify () {
        return through(function (row, enc, next) {
            this.push(row.toString());
            next();
        });
    }
}