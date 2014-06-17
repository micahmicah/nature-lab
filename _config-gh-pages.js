var fs     = require('fs');
var yaml   = require('js-yaml');
var remote = require('resolve-git-remote');

var file = './_config.yml';

console.log('Check for gh-pages, and align _config.yml with it.');

remote(function (err, repo) {
    if (err) return console.log('\nNo Github repositories found.');

    console.log('\nFound github repository: ', repo);
    
    var baseurl = '/' + repo.split('/')[1];
    console.log('\nUpdating _config.yml with: ');
    console.log('\tbaseurl: ', baseurl);

    var config;
    try {
        config = yaml.safeLoad(fs.readFileSync(file, 'utf8'));
    } catch (e) {
        console.log('Error reading: ', file);
        console.log(e);
        return;
    }

    config.baseurl = baseurl;
    
    fs.writeFileSync(file, yaml.safeDump(config));
});