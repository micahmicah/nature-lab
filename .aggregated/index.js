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

    /* Anticipate the array of names to
       be written out, and when they are
       push null into the stream, which
       closes it, and notifies the system
       that aggregating is done. */
    var watcher = streamWatcher([
        'tumblr.json'],
        function () {
            console.log('Aggregated: Finished');
            t.push(opts);
            t.push(null);
        });

    /* Wrap fs.createWriteStream in order
       to know when a write is complete.
       Takes a watcher instances so that it
       can remove the name of the file that
       has been passed in when that file is
       done being written */
    var dump = dumper(watcher);

    var tmblr = Tumblr(opts.tumblr);

    tmblr.retrieve()
        .pipe(stringify())
        .pipe(dump('tumblr.json'));


    return t;

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

function dumper (watcher) {
    return function (name) {
        // console.log('Aggregator: Write start: ', name);
        var w = fs.createWriteStream(
                    __dirname + '/dump/' + name,
                    { encoding: 'utf8'});

        return through.obj(write, end);

        function write (row, enc, next) {
            w.write(row);
            next();
        }

        function end () {
            console.log('Aggregator: Write finished: ', name);
            w.end();
            watcher(name);
            this.push({
                file: name,
                statue: 'Written.'
            });
            this.push(null);
        }
    };
}