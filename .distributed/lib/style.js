var through = require('through2');
var sass = require('node-sass');

module.exports = styleBundle;

function styleBundle (root) {
    var relative = '/static/style/bundle.scss';
    // var sourceMap = relative + '.map';
    var t = through();

    sass.render({
        file: root + relative,
        success: function (css) {
            t.push(css);
            t.push(null);
        },
        error: function (err) {
            console.error("Bundling styles.");
            console.error(err);
            t.push(null);
        }
    });

    return t;
}