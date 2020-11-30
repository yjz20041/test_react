// const fs = require('fs');
// const UglifyJS = require('uglify-js');
// var result = UglifyJS.minify(fs.readFileSync("ut.js", "utf8"), {
// });
// console.log(result.code)
let timer;
function a(fn, a, b) {
  const cb = (count) => {
    timer = setTimeout(() => {
      fn();
      cb(++count);
      console.log(a, count, b, a + count * b);
    }, a + count * b)
  }
  cb(0)
}