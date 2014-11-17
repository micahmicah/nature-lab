var fs = require('fs');
var through = require('through2');

var Tumblr = require('./tumblr/index.js');

module.exports = aggregated;

function aggregated (opts) {
    console.log('Aggregated: Starting');

    /* Used to represent state in
       this function. When it closes,
       that means all of the aggregating
       is done. */
    var t = through.obj();

    var tmblr = Tumblr(opts.tumblr);

    t.push(opts);
    t.push(null);

    fetch();
    setInterval(function () {
        fetch();
    }, 60000);


    return t;

    function fetch () {
        return tmblr.retrieve()
            .pipe(write(tmblr.key, opts.db));
    }
}


function stringify () {
    return through.obj(function (row, enc, next) {
        this.push(JSON.stringify(row) + "\n");
        next();
    });
}

function streamWatcher (expects, finish) {
    // console.log('Aggregator: Expecting: ', expects);
    return function (streamName) {
        var i = expects.indexOf(streamName);
        if (i > -1) {
            expects.splice(i, 1);
        }

        if (expects.length === 0) {
            finish();
        }
        // console.log('Aggregator: Watching: ', streamName);
    };
}

function write (key, db) {
    return through.obj(function (row, enc, next) {
        console.log('writing');
        console.log(row);
        var kv = { type: 'put' };
        kv.key = key(row);
        kv.value = row[row.type];
        kv.value.type = row.type;
        db.put(kv.key, kv.value);
        next();
    });
}