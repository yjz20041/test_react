Promise.all = function(arr) {
  return new Promise((resolve, reject) => {
    const retArray = [];
    arr.forEach(p => {
      p.then(ret => {
        retArray.push(ret);
        if (retArray.length === arr.length) {
          resolve(retArray)
        }
      }).catch(e => {
        reject(e);
      })
    })
  })
}