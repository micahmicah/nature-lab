var json = __dirname + '/tumblr.json';
var fs = require('fs');

module.exports = {
    key: function (d) {
        if ('published' in d) {
            return 'published!' +
                   d.published.agmetadata.description.slug + '!' +
                   d.published.id;
        } else if ('subscribed' in d) {
            return 'subscribed!tumblr!' +
                   d.subscribed.description.slug;
        }
    },
    values: fs.readFileSync(json)
        .toString()
        .trim()
        .split('\n')
        .map(function (d) {
            return JSON.parse(d);
        })
};