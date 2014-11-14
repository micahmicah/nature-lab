var through = require('through2');

module.exports = sourceUrls;

function sourceUrls () {
    var self = {};

    var urls = self.urls = [{
            url: "nature-lab-news.tumblr.com",
            platform: {
                type: "tumblr",
                url: "nature-lab-news.tumblr.com"
            },
            description: {
                title: "Nature Lab News",
                slug: "nature-lab-news"
            }
        }];

    self.asStream = asStream;

    function asStream () {
        var t = through.obj();
        urls.map(function (d) {
            t.push(d);
        });
        return t;
    }

    return self;
}