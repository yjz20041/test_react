function makeAlmostEqual (arr, part) {
  let orderedArr = arr.sort((a,b) => b - a)
  let res = Array(part).fill(void(0)).map(() => [])
  orderedArr.forEach(value => {
    let minArrIndex = getMinArrIndex(res)
    res[minArrIndex].push(value)
  })
  return res
}
  
function getSum (arr) {
    return arr.reduce((sum, v) => sum + v, 0)
}
  
function getMinArrIndex (arrs) {
  let minArrIndex = 0
  arrs.forEach((arr, index) => {
    if (getSum(arrs[minArrIndex]) > getSum(arrs[index])) {
      minArrIndex = index
    }
  })
  // console.log(arrs)
  return minArrIndex
}