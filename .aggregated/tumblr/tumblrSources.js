module.exports = tumblrSources;

function tumblrSources () {
    return require('../sources')().urls
        .filter(function (d, i) {
            var bool = false;
            if (d.platform.type === 'tumblr') {
                bool = true;
            }
            return bool;
        });
}