var through = require('through2');
var find = require('findit');
var path = require('path');

/*
Given a root directory, return a function
that returns a stream of `pagePath` objects.
A `pagePath` object is just a javscript
object that has these properties.
{
    type: 'pagePath',
    relative: relative path from the root,
    full: the full path to the template
}
*/
module.exports = function (extensionOfInterest) {
    return function (root) {
        return function () {
            var t = through.obj();

            var finder = find(root);

            finder.on('file', function (file, state) {
                if ((file.split('.').pop() === extensionOfInterest) &
                    ((file.match(/node_modules/g) === null))) {

                    t.push({
                        type: 'pagePath',
                        relative: path.relative(root, file),
                        full: file
                    });
                }
            });

            finder.on('end', function () {
                t.push(null);
            });

            return t;
        };
    };
};