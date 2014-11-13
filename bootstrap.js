/*

Local Dev Bootstrap.

- remove database
- recreate database
- load js files from dirs

*/

var fs = require('fs');
var through = require('through2');
var level = require('level');
var combine = require('stream-combiner2');

module.exports = Bootstrap;

function Bootstrap (dbDir) {

    var folders = [rel('/.aggregated/dump')];
    var files = folders
        .map(function (d) {
            return { root: d };
        })
        .map(function (d) {
            d.files = fs.readdirSync(d.root);
            return d.files.map(abs(d.root));
        })
        .reduce(function(a, b) {
            return a.concat(b);
        });

    var values = files.filter(function (d) {
        var extension = d.split('.').pop();
        return extension === 'js';
    });



    return combine(
        destroy(),
        create(),
        populate(values));
        // verify()



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

    function populate (values) {
        // through stream that writes
        // values of the dumped data
        // into the database.
        // pushes the same value it
        // recieved when its done
        return through.obj(function (row, enc, next) {
            console.log('Database: Populate');
            var self = this;
            var ws = row.db.createWriteStream();
            ws.on('error', function (err) {
                console.error('Bootstrap.Populate: ', err);
            });
            ws.on('close', function () {
                self.push(row);
                next();
            });
            values.map(function (d) {
                    return require(d);
                })
                .map(function (d) {
                    d.values.map(function (v) {
                        var kv = { type: 'put' };
                        kv.key = d.key(v);
                        kv.value = v[v.type];
                        kv.value.type = v.type;
                        ws.write(kv);
                    });
                    ws.end();
                });
        });
    }

    function verify () {
        return through.obj(function (row, enc, next) {
            var self = this;
            // var rs = row.db.createReadStream();
            // var c = 0;
            // rs.on('data', function (d) {
            //     c += 1;
            // });
            // rs.on('close', function () {
            //     console.log('counted: ', c);
            //     self.push(row);
            //     next();
            // });


            var c = 0;
            row.db.createReadStream()
                .pipe(through.obj(function (row, enc, next) {
                    if (row.value.type === 'published') {
                        if (row.value.agmetadata.platform === 'tumblr') {
                            c += 1;
                        }
                    }
                    next();
                }, function () {
                    console.log('counted: ', c);
                    self.push(row);
                    this.push(null);
                }));


            // var c = 0;
            // row.db.createReadStream({
            //         start: 'published!',
            //         end: 'published!\uffff'
            //     })
            //     .pipe(through.obj(function (row, enc, next) {
            //         if (row.value.type === 'subscribed') {
            //             c += 1;
            //         }
            //         next();
            //     }, function () {
            //         console.log('counted: ', c);
            //         self.push(row);
            //         this.push(null);
            //     }));
        });
    }

    function abs (dir) {
        return function (p) {
            return dir + '/' + p;
        };
    }

    function rel (p) {
        return __dirname + p;
    }
}