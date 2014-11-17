var through = require('through2');
var tumblr = require('tumblr.js');

module.exports = TumblrClient;

function TumblrClient (opts) {
    var sources = require('./tumblrSources.js')();

    var client = new tumblr.Client({
        consumer_key: opts.consumer_key,
        consumer_secret: opts.consumer_secret
    });

    client.retrieve = function () {
        var stream = through.obj();

        var p = stream
            // .pipe(latestPostInDB())
            .pipe(posts());

        sources.forEach(function (d) {
            stream.push(d);
        });
        stream.push(null);

        return p;
    };

    client.key = require('./key.js');

    return client;

    function posts () {
        return through.obj(function (row, enc, next) {
            if (!('url' in row)) {
                throw new Error('Expect url property.');
            }
            var self = this;
            var options = {
                offset: 0
            };

            self.push({
                type: 'subscribed',
                subscribed: row
            });

            gather(self, row.platform.url, options);

            function gather (s, url, options) {
                client.posts(url, options, function (err, res) {
                    if (err) {
                        console.error('Aggregated.Tumblr: ' +
                            'Error gathering posts for: ', row);
                        console.error('  With options: ', options);
                        console.error(err);
                        next();
                    } else {
                        if (res.posts.length > 0) {
                            res.posts.map(emit);
                            var count = res.posts
                                .map(function (d) {
                                    return 1;
                                })
                                .reduce(function (a, b) {
                                    return a + b;
                                });
                            options.offset += count;
                            gather(s, url, options);
                        } else {
                            next();
                        }
                    }

                    function emit (d, i) {
                        d.agmetadata = {
                            platform: row.platform,
                            url: row.url,
                            description: row.description
                        };
                        s.push({
                            type: 'published',
                            published: d
                        });
                    }
                });
            }
        });
    }
}