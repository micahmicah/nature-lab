var through = require('through2');

var dbDir = __dirname + '/.db';
var database = require('./bootstrap.js');

var nconf = require('nconf');
nconf.argv().env().file({ file: 'config.json' });

options()
    // .pipe(aggregate(nconf))
    .pipe(database(dbDir))
    .pipe(distribute());

function options () {
    return gather()
        .pipe(port())
        .pipe(root());

    function gather () {
        var t = through.obj();
        t.push({});
        t.push(null);
        return t;
    }

    function port () {
        var portfinder = require("portfinder");
        var basePort = 4000;
        portfinder.basePort = parseInt(basePort, 10);

        return through.obj(function (row, enc, next) {
            var self = this;
            portfinder.getPort(function(err, port){
                if(err) {
                    console.error(err.toString());
                    self.push(null);
                    return;
                }
                row.port = port;
                self.push(row);
                next();
            });
        });
    }

    function root () {
        return through.obj(function (row, enc, next) {
            row.rootDir = __dirname;
            this.push(row);
            next();
        });
    }
}

function aggregate (nconf) {
    var opts;
    var aggregator = require('./.aggregated');

    return through.obj(write);

    function write (row, enc, next) {
        var self = this;
        opts = row;

        opts.tumblr = {
            consumer_key: nconf.get('TUMBLR_OAUTH_CONSUMER_KEY'),
            consumer_secret: nconf.get('TUMBLR_OAUTH_CONSUMER_SECRET')
        };

        var a = aggregator(opts);
        a.on('data', function (d) {
                console.log('Data from aggregator');
                self.push(d);
            })
            .on('end', function () {
                console.log('Null from aggregator');
                next();
            });
    }
}


function distribute () {
    var opts;

    return through.obj(write, end);
    
    function write (row, enc, next) {
        opts = row;

        row.distributed = require('./.distributed')(opts);

        this.push(row);

        next();
    }

    function end () {

        console.log('\n\n---');
        console.log('Visit: localhost:', opts.port);
        console.log('\n');
    }
}