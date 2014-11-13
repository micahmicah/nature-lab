var routes = require('routes');
var through = require('through2');

var Templates = require('./lib/templates.js');
var mapUrlTemplate = require('./lib/mapUrlTemplate.js');
var styleBundle = require('./lib/style.js');
var scriptBundle = require('./lib/script.js');

var compilePage = require('./lib/compilePage.js');

module.exports = function (opts) {
    if (opts.plex === undefined |
        opts.rootDir === undefined) {
        throw new Error("Router options not so optional.");
    }

    var plex = opts.plex;
    var rootDir = opts.rootDir;
    var templates = Templates('jsx')(opts.rootDir);

    require('node-jsx').install({
      additionalTransform: function (src) {
        return src
            .replace(/_includes/g, rootDir + '/_includes');
      }
    });

    var router = routes();

    router.addRoute('/', function (req, res, m) {
        m.url = req.url;
        res.setHeader('content-type', 'text/html');

        /* Data stream */
        var d = plex.open('/nodata');

        /* pagePath stream */
        var p = templates().pipe(mapUrlTemplate(m));

        /* Compilation stream */
        var c = compilePage(p, d);

        c.pipe(stringify()).pipe(res);
    });

    router.addRoute('/news/', function (req, res, m) {
        m.url = req.url;
        
        res.setHeader('content-type', 'text/html');

        /* pagePath stream */
        var p = templates().pipe(mapUrlTemplate(m));

        /* Data stream */
        m.params.source = 'nature-lab-news';
        var d = plex.open(
            '/news', m.params);

        /* Compilation stream */
        var c = compilePage(p, d);

        c.pipe(stringify()).pipe(res);
    });

    router.addRoute('/news/:source', function (req, res, m) {

        var i = findChar(3)(req.url, '/');
        m.url = req.url.substring(0, i+1);

        res.setHeader('content-type', 'text/html');

        /* pagePath stream */
        var p = templates().pipe(mapUrlTemplate(m));

        /* Data stream */
        var d = plex.open(
            '/news', m.params);

        /* Compilation stream */
        var c = compilePage(p, d);

        c.pipe(stringify()).pipe(res);
    });

    router.addRoute('/collections/', function (req, res, m) {
        m.url = req.url;
        res.setHeader('content-type', 'text/html');

        /* Data stream */
        var d = plex.open('/nodata');

        /* pagePath stream */
        var p = templates().pipe(mapUrlTemplate(m));

        /* Compilation stream */
        var c = compilePage(p, d);

        c.pipe(stringify()).pipe(res);
    });

    router.addRoute('/contact/', function (req, res, m) {
        m.url = req.url;
        res.setHeader('content-type', 'text/html');

        /* Data stream */
        var d = plex.open('/nodata');

        /* pagePath stream */
        var p = templates().pipe(mapUrlTemplate(m));

        /* Compilation stream */
        var c = compilePage(p, d);

        c.pipe(stringify()).pipe(res);
    });

    router.addRoute(
        '/static/style/bundle.css',
        function (req, res, m) {
            res.setHeader('content-type', 'text/css');
            var style = styleBundle(rootDir);

            if (req.headers['accept-encoding']
                    .indexOf('gzip') > -1) {
                var zlib = require('zlib');
                res.setHeader('content-encoding', 'gzip');
                style.pipe(zlib.createGzip()).pipe(res);
            } else {
                style.pipe(res);
            }
        });

    router.addRoute(
        '/static/script/bundle.js',
        function (req, res, m) {
            res.setHeader('content-type', 'text/javascript');
            var script = scriptBundle(rootDir);

            if (req.headers['accept-encoding']
                    .indexOf('gzip') > -1) {
                var zlib = require('zlib');
                res.setHeader('content-encoding', 'gzip');
                script.pipe(zlib.createGzip()).pipe(res);
            } else {
                script.pipe(res);
            }
        });

    return router;

    function findChar (c) {
        /* Find the Cth occurence of
           f in s. Return the index. */
        return function (s, f) {
            var count = 0;
            var p = 0;
            p = find();

            return p;

            function find () {
                count += 1;
                p = s.indexOf(f, p);

                if (count === c) {
                    return p;
                } else {
                    p += 1;
                    return find();
                }
            }
        };
    }

    function stringify () {
        return through(function (row, enc, next) {
            this.push(row.toString());
            next();
        });
    }

    function loggify () {
        return through.obj(function (row, enc, next) {
            console.log(row);
            next();
        });
    }
};