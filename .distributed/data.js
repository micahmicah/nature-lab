var dataplex = require('dataplex');
var through = require('through2');

module.exports = function (db) {
    var plex = dataplex();

    plex.add('/nodata', function () {
        var t = through();
        t.push(null);
        return t;
    });

    plex.add('/news', function (opts) {
        /* Return all sources of content
           for a given platform. */

        return db.createReadStream({
            start: 'published!' + opts.source + '!',
            end: 'published!' + opts.source + '!\uffff'
        }).pipe(through.obj(function (row, enc, next) {
            row.value.type = 'news';
            this.push(row.value);
            next();
        }));
    });

    plex.add('/news/ticker', function (opts) {
        
        return plex.open('/news', opts)
            .pipe(through.obj(function (row, enc, next) {
                // row.agmetadata.ticker
                // row.tags
                this.push(row);
                next();
            }));
    });

    return plex;
};

function loggify () {
    return through.obj(function (row, enc, next) {
        console.log(row);
        this.push(row);
        next();
    });
}