/*

Local Dev Bootstrap.

- remove database
- recreate database
- load js files from dirs

*/

var through = require('through2');
var level = require('level');
var combine = require('stream-combiner2');

module.exports = Bootstrap;

function Bootstrap (dbDir) {

    return combine(
        destroy(),
        create());



    function destroy() {
        return through.obj(function (row, enc, next) {
            console.log('Database: Destroy');
            var self = this;
            level.destroy(dbDir, function (err) {
                if (err) {
                    console.error(err);
                    self.push(null);
                    throw new Error(err);
                }
                row.db = {
                    dir: dbDir
                };
                self.push(row);
                next();
            });
        });
    }

    function create () {
        return through.obj(function (row, enc, next) {
            console.log('Database: Create');
            var self = this;
            var db = level(row.db.dir, {
                keyEncoding: require('bytewise'),
                valueEncoding: 'json'
            });

            db.on('ready', function () {
                row.db = db;
                self.push(row);
                next();
            });
        });
    }
}