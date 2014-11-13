var fs = require('fs');
var html_article = fs.readFileSync(__dirname +
                                   '/article.html', 'utf8');
var html_tag = fs.readFileSync(__dirname +
                               '/tag.html', 'utf8');
var hyperspace = require('hyperspace');

module.exports = function article () {
    var self = {},
        container;

    var render_tags = hyperspace(html_tag, function (d) {
        
    });

    var render_article = hyperspace(html_article, function (d) {
        return {
            '.headline': d.title,
            '.news-entry': {
                _html: d.html
            },
            '.news-story-date': d.ticker_timestamp
        };
    });

    self.container = function (x) {
        if (!arguments.length) return container;
        container = x;
        return self;
    };

    self.render = function (data) {
        hs.appendTo(container)
            .write(data);
    };

    return self;
};