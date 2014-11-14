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

        var perPage = opts.perPage || 10;
        
        var page = parseInt(opts.page, 10) || 1;
        var offset = perPage * (page - 1);
        
        var total = 1;

        var prevPage = page - 1;
        var nextPage = page + 1;
        
        var prev = true;
        var next = false;

        if (page === 1) {
            prev = false;
        }

        return db.createReadStream({
            start: 'published!nature-lab-news!',
            end: 'published!nature-lab-news!\uffff'
        }).pipe(through.obj(function (row, enc, next) {

            if ((total > offset) &&
                (total <= (offset + perPage))) {

                row.value.type = 'news';
                this.push(row.value);
            }
            
            total += 1;
            next();

        }, function () {

            if ((total - 1) > (offset + perPage)) {
                next = true;
            }

            this.push({
                type: 'pagination',
                next: next,
                prev: prev,
                page: page,
                prevPage: prevPage,
                nextPage: nextPage
            });

            this.push(null);
        }));
    });

    plex.add('/news/post', function (opts) {
        if (!('post' in opts)) {
            throw new Error('Requires post id');
        }

        opts.post = parseInt(opts.post, 10);

        return db.createReadStream({
            start: 'published!nature-lab-news!',
            end: 'published!nature-lab-news!\uffff'
        }).pipe(through.obj(function (row, enc, next) {
            if (opts.post === row.value.id) {
                row.value.type = "news";
                this.push(row.value);
            }
            next();
        }));
    });

    plex.add('/news/ticker', function (opts) {
        if (!opts) opts = {};

        opts.perPage = 3;
        opts.page = 1;

        return plex.open('/news', opts)
            .pipe(through.obj(function (row, enc, next) {
                if (row.type === 'news') {
                    row.type = "newsTickerItem";
                    this.push(row);
                }

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