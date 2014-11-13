var http = require('http');

module.exports = Distributed;

function Distributed (opts) {
    var port = opts.port || 4010;
    var db = opts.db;

    var ecstatic = require('ecstatic')
                          (opts.rootDir + '/static');

    var dataplex = require('./data.js');
    var router = require('./router.js')
                        ({plex: dataplex(db),
                          rootDir: opts.rootDir});

    var server = http.createServer(function (req, res) {
        var m = router.match(req.url);
        if (m) m.fn(req, res, m);
        else ecstatic(req, res);
    });
    server.listen(port);

    // var shoe = require('shoe-bin');
    // var sockPlex = shoe(function (stream) {
    //     stream.pipe(dataplex(db)).pipe(stream);
    // });
    // var sockDb = shoe(function (stream) {
    //     stream.pipe(feed(db)).pipe(stream);
    // });
    // sockPlex.install(server, '/sock/plex');
    // sockDb.install(server, '/sock/db');
}