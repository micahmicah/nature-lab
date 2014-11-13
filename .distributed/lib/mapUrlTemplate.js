var through = require('through2');
var path = require('path');

/*
findPage is a through stream
who takes a `url` as its option.

It expects an input stream of
`pagePath` objects, and chooses
the correct `pagePath` object
for the given `url`.

*/

module.exports = function (matched) {
    var filename = matched.name || 'index.jsx';
    var match = matched.url.slice(1) + filename;

    return through.obj(function (row, enc, next) {
        if (row.type != 'pagePath') {
            throw new Error('Expected templatePath object.');
        }

        
        if (row.relative === match) {
            found = true;
            row.url = matched.url;
            this.push(row);
        }

        next();
    });
};