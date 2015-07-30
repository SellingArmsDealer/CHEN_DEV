/**
 * Created by CHEN_B on 2015-7-30.
 */
var fs = require('fs');

exports.lowerCase = function (myfile) {
    if (fs.existsSync(myfile)) {
        var content = fs.readFileSync(myfile, 'utf8');
        console.log(content.toLowerCase());
    } else {
        console.log("File does not exist - " + myfile);
    }
}

exports.lowerCase('test/data/sample.txt');
