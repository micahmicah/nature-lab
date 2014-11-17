module.exports = function (d) {
    if ('published' in d) {
        return 'published!' +
               d.published.agmetadata.description.slug + '!' +
               d.published.id;
    } else if ('subscribed' in d) {
        return 'subscribed!tumblr!' +
               d.subscribed.description.slug;
    }
};