var count = 0;
var a = setInterval(() => {
  count ++;
  console.log(count)
  if (count > 2) throw new Error('123')
}, 2000)

let stopTimer = (code) => {
  console.log('code:', code)
  clearInterval(a);
}

process.on('SIGINT', stopTimer.bind(null, 2))
process.on('SIGTERM', stopTimer.bind(null, 15))
process.on('exit', function (code) {
  console.log('exit');
})