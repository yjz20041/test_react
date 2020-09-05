const fs = require('fs');
const UglifyJS = require('uglify-js');
var result = UglifyJS.minify(fs.readFileSync("ut.js", "utf8"), {
});
console.log(result.code)