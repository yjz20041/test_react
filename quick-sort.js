const quickSort = (arr) => {
  let baseIndex = 0;
  let i;
  let j;
  for (i = 1, j = arr.length - 1; i < j; i++, j--) {
    if (arr[i] > arr[baseIndex]) {
      const t = arr[i];
      arr[i] = arr[baseIndex];
      arr[baseIndex] = t;
      baseIndex = i;
    }
    if (arr[j] < arr[baseIndex]) {
      const t = arr[j];
      arr[j] = arr[0];
      arr[0] = t;
      baseIndex = j;
    }
  }
  quickSort(arr.slice(0, baseIndex));
  quickSort(arr.slice(baseIndex + 1));

  return arr;
}

const quickSort = (arr) => {
  if (!arr.length) return [];
  const base  = arr[0];
  const left = [];
  const right = [];

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] >= base) {
      right.push(arr[i])
    } else {
      left.push(arr[i]);
    }
  }
  return quickSort(left).concat([base]).concat(quickSort(right))
}


const quickSort = (arr, start = 0, end = arr.length - 1) => {
  if (!arr.length || start < 0 || end > arr.length - 1 || start > end) return arr;
  const baseValue = arr[start];
  // 基准下标
  let base = start;
  let left = start;
  let right = end;
  while(right > left) {
      while(right > left) {
        const rightValue = arr[right];
        if (rightValue < baseValue) {
          arr[right] = baseValue;
          arr[base] = rightValue;
          base = right;
          break;
        }
        right--;
      }
      while(right > left && left <= end) {
        const leftValue = arr[left];
        if (leftValue > baseValue) {
          arr[left] = baseValue;
          arr[base] = leftValue;
          base = left;
          // left + 1，用于下个循环的判断
          left++;
          break;
        }
        left++;
      }
  }
  quickSort(arr, start, base - 1);
  quickSort(arr, base + 1, end);
  
  return arr;
}

// 二叉树中序遍历
const inorderTranversal = (root) => {
  if (!root) return [];
  const ret = [];
  const {
    left,
    rigth,
    val
  } = root;
  if (left) {
    ret = ret.concat(inorderTranversal(left));
  }
  ret.push(val);
  if (right) {
    ret = ret.concat(inorderTranversal(right));
  }
  return ret;
}

// 最大子序列和
const maxSubArr = (arr) => {
  // 以index结尾的最大子序列和
  const dp = [];
  dp[0] = arr[0];
  let max = arr[0];
  for (let i = 1; i < arr.legnth; i++) {
    dp[i] = arr[i] + Math.max(dp[i-1], 0);
    max = Math.max(max, dp[i]);
  }
  return max;
}

// 爬楼梯付体力
const climbStair = (costs) => {
  const dp = [];
  dp[0] = 0;
  dp[1] = 0;
  for (let i = 2; i < costs.length; i++) {
    dp[i] = Math.min(dp[i - 1] + costs[i-1], dp[i - 2] + costs[i - 2])
  }
}

// 
const stockProfit = (arr) => {
  const dp = [];
  for (let i = 0; i < arr.length; i++) {
    dp.push([])
  };
  dp[0][0] = 0;
  dp[0][1] = -arr[0];
  for (let i = 1; i < arr.length; i++) {
    dp[i][0] = Math.max(dp[i-1][0], dp[i-1][1] + arr[i] - fee);
    dp[i][1] = Math.max(dp[i-1][0] - arr[i], dp[i - 1][1]);
  }
  return dp[arr.length - 1][0];
}


// 

/**
 * 

  dp[i][0] = Math.max(dp[i-1][0], dp[i-1][1])
  dp[i][1] = dp[i-1][0] + arr[i]
 */

const message = (arr) => {
    const dp = [];
    const dp = [];
    for (let i = 0; i < arr.length; i++) {
      dp.push([])
    };
    dp[0][0] = 0;
    dp[0][1] = Math.max(arr[0], arr[1]);
    for (let i = 2; i < arr.length; i++) {
      dp[i] = dp[i - 2]
    }
}



// 串行all
const serialAll = (arr) => {
  return new Promise((resolve, reject) => {
    const ret = [];
    const current = arr.pop();
    current.then(data => {
      ret.push(data);
      if (arr.length) {
        serialAll(arr).then(otherData => {
          resolve(ret.concat(otherData));
        }).catch(e => reject(e));
      } else {
        resolve(ret);
      }
    }).catch(e => reject(e))
  });
}



serialAll([

  new Promise(resolve => {
    setTimeout(() => {
      console.log(1);
      resolve();
    }, 1000)
  }),
  new Promise(resolve => {
    setTimeout(() => {
      console.log(2);
      resolve();
    }, 1000)
  })

])

class Flow {
  constructor(arr) {
    this.queue = arr ? arr.flat() : [];
  }

  startTask() {
    const task = this.queue.shift();
    return new Promise((resolve) => {
      // 嵌套
      if (task instanceof Flow) {
        task.run(resolve);
      } else {
        const fn = task();
        if (fn instanceof Promise) {
          fn.then(resolve);
        }  else {
          resolve();
        }
      }
    })
  }

  run(cb) {
    if (this.queue.length) {
      this.startTask().then(() => this.run(cb))
    } else {
      cb();
    }
  }
}

const createFlow = (arr) => {
  
  return new Flow(arr)
}


// 

const bofei = (count) => {
  const ret = [];
  ret[0] = 1;
  ret[1] = 1;
  for (let i = 2; i < count; i++) {
    ret[i] = ret[i - 1] + ret[i - 2];
  }
  return ret;
}


const n = (fn) => {
  const obj = Object();
  obj.constructor = fn;
  fn.call(obj);
  return obj;
}


const bubble = (arr) => {
  const l = arr.length;
  for (let i = l - 1;  i > 0; i--) {
    for (let j = 0; j < i; j++) {
      if (arr[j] > arr[j + 1]) {
        const temp = arr[j+1];
        arr[j + 1] = arr[j];
        arr[j] = temp;
      }
    }
  }
  return arr;
}

const bubble2 = (arr) => {
  const l = arr.length;
  for (let i = 0; i < l; i++) {
    for (let j = 0; j < l - i - 1; j++) {

    }
  }
}


const flat = (arr) => {
  const ret = [];
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    if (Array.isArray(item)) {
      ret = ret.concat(flat(item));
    } else ret.push(item);
  }
  return ret;
}

const flat2 = (arr) => {
  const ret = [];
  while(arr.length) {
    const v = arr.shift();
    if (Array.isArray(v)) {
      arr.unshift(v);
    } else {
      ret.push(v);
    }
  }
  return ret;
}




[
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
]

// 2,0
// 1,0

// 2,1
// 0 0

// 2 2

// 0 1


function slantIteration (arr) {
  ret = [];

  let startRow = arr.length - 1;
  let startCol = 0;
  let row = startRow;
  let col = startCol;
  let ele = arr[row][col];

  while(ele !== undefined) {
    ret.push(ele);
    if (row + 1 > arr.length - 1 || col + 1 > arr.length - 1) {
      startRow--;
      if (startRow < 0) {
        startRow = 0;
        startCol++;
      }
      row = startRow;
      col = startCol;
    } else {
      row++;
      col++;
    }
    ele = arr[row][col]
  }
  return ret;
}


// circularDep

/**
 * 
 * var m1 = { name: 'm1', deps: [m2]}
 * 
 * 
 * 
 */
 var arr = [
  { id: 'm1', deps: ['m2', 'm22']},
  { id: 'm2', deps: ['m3', 'm4']},
  { id: 'm22', deps: ['m3', 'm4']},
  { id: 'm3', deps: ['m1']},
  { id: 'm4', deps: []}
 ]

function circularDep (arr) {
  const isCircular = (o, depList = []) => {
    if (depList.indexOf(o.id) >= 0) {
      return true;
    } else {
      depList.push(o.id);
    }
    if (o.deps.length) {
      return o.deps.some(id => {
        const item = arr.find(m => m.id === id);
        if (item) {
          return isCircular(item, depList.slice())
        }
        return false;
      })
    }
    return false;
  }
  return arr.some(item => isCircular(item));
}

// arry plus

// [1,2,-1,3,4, 5, 6, -8]

// force

const arrayPlus = (arr) => {
  const l = arr.length;
  const ret = [];
  for (let i = 0; i < l; i++) {
    for (let j = i + 1; j < l; j++) {
      for (let k = j + 1; k < l; k++) {
        if (arr[i] + arr[j] + arr[k] === 0) {
          ret.push([arr[i], arr[j], arr[k]]);
        }
      }
    }
  }
  return ret;
}

// 

const arrayPlus2 = (arr) => {
  arr = arr.sort((a, b) => a - b);
  let last = arr.findIndex(item => item < 0);
  const map = {};
  arr.forEach(item => {
    map[item] = item;
  });
  const ret = [];
  for (let i = 0; i <= last; i++) {
    if (arr[i] === arr[i - 1]) {
      continue;
    }
    for (let j = arr.length - 1; j > last; j--) {
      const match = map[-(arr[i] + arr[j])];
      if (match !== undefined) {
        ret.push([arr[i], arr[j], match]);
      }
    }
  }
  return ret;
}

// reduce
const reduce = (arr, callback, initValue) => {
  let prev = initValue;
  for (let i = 0; i < arr.length; i++) {
    prev = callback(prev, arr[i]);
  }
  return prev;
}

Array.prototype.bbb = function (callback, initValue) {
  let prev = initValue;
  for (let i = 0; i < this.length; i++) {
    prev = callback(prev, this[i]);
  }
  return prev;
}
