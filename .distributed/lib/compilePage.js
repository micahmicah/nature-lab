/* Compile Page.
    
   Expects 2 streams.

   First, a stream that will push
   `pagePath` objects. There should
   only be one, and it will be the
   page that gets compiled.

   Second, a stream that will push
   data objects. There will be
   many of these, and they get pushed
   into a local array of data
   objects.

   The output of this stream is
   the `pagePath` that has been
   compiled with the data array.
*/

var React = require('react');
var through = require('through2');

/* Could potentially use browserify and
   transforms to do what you are with the
   react library. */
// var browserify = require('browserify');
// var reactify = require('reactify');
// var modular = require ('./modular.js');

module.exports = compilePage;

function compilePage (pageS, dataS) {
    if ((typeof pageS === 'undefined') |
        (typeof dataS === 'undefined')) {
        throw new Error('Distributed.lib.compilePage: ' +
            'Requires both page and data stream.');
    }
    /* Will eventually store the path to the page
       that will be compiled. */
    var pagePath;

    /* Will eventually store the data for the page
       that will be compiled. */
    var data = [];

    var t = through();
    var compile = toCompile(t);
    var streamEnd = StreamWatcher(compile);

    pageS.on('data', function (d) {
        pagePath = d.full;
        data.push({
          type: 'requestUrl',
          requestUrl: d.url
        });
    });

    pageS.on('end', function () {
        streamEnd('page');
    });

    dataS.on('data', function (d) {
        data.push(d);
    });

    dataS.on('end', function () {
        streamEnd('data');
    });

    return t;

    function StreamWatcher (cb) {
        var expects = [ 'data', 'page' ];
        return function (streamName) {
            var i = expects.indexOf(streamName);
            if (i > -1) {
                expects.splice(i, 1);
            }

            if (expects.length === 0) {
                cb();
            }
        };
    }

    function toCompile (stream) {
        return function () {
            console.log('Distributed.lib.compilePage: ' +
                'Data Objects in Template: ' + data.length);
            /* When both input streams are done,
               take the results of each and push
               out an html object that is the result
               of compiling the data and the page
               path defined. */
            if (!pagePath) {
                throw new Error('Requires page path');
            }
            
            // var b = browserify()
            //   .pipe(reactify(pagePath));
            // b.transform(modular());

            var p = require(pagePath);

            /* Create a React factory from the class
               that we can push data into. */
            var factory = React.createFactory(p);

            /* Compile the view given the factory
               and the data */
            var view = React.renderToString(factory({
                data: data
            }));

            stream.push(view);
            stream.push(null);
        };
    }
}