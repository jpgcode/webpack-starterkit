var fs = require('fs');
const path = require('path');
const copy = require('recursive-copy');


const from = path.resolve(__dirname, 'dist');
var to = path.resolve(__dirname, 'dist/assets/scripts');
const options = {
    filter: ['*.js']
}

console.log('...Copying files...');

copy(from, to, options)
    .then(function(results) {
        results.map(result => fs.unlinkSync(result.src));
    })
    .catch(function(error) {
        console.error('Copy failed: ' + error);
    });
