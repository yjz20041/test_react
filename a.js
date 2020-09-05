// const crypto = require('crypto');

// const c = crypto.createHash('md5');

// c.update('hello yjz');
// console.log(c.digest('hex'));

// const argv = require('yargs').argv;
// console.log(argv)
const parse = require('@financial-times/useragent_parser');
console.log(parse('Mozilla/5.0 (Linux; Android 8.0.0; MI 6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.105 Mobile Safari/537.36'))