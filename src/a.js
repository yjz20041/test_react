const { contextType } = require("react-loader");

const sum = (a) => {
    let ret = a;
    if (a >= 100) {
        return a;
    } else {
        return ret + sum(a+1)
    }
}

const duplicate = (arr) => {
    const set = new Set(arr);
    return Array.from(set);
}

class intervalManager {
    start(fn, a, b) {
        this.timer = setTimeout(() => {
            fn();
            this.start(fn, a + b, b)
        }, a)
    }

    clear() {
        clearTimeout(this.timer);
    }
}

/**
 * 

1 2 3 4
2 3 4 5
3 4 5 6



 */

const merge = (arr) => {

}


const test = () => {
    function a () {
        console.log(b);
    }
    let b = 1;
    a();
}

const b = clone(a);

const clone = (obj) => {
    const co = {};
    Object.keys(obj).forEach(key => {
        const v = obj[key];
        if (typeof v === 'object') {
            co[key] = clone(v);
        } else {
            co[key] = v;
        }
    });
    return co;
}


all = (arr) => {
    const ret = [];
    const l = arr.length;
    return new Promise((resolve, reject) => {
        arr.forEach((item, i) => {
            item.then((data) => {
                ret[i] = data;
            }).catch((e) => {
                reject(e);
            });
            if (ret.length === l) {
                resolve(ret);
            }
        })
    })
}

race = (arr) => {
    const ret = [];
    return new Promise((resolve, reject) => {
        let hasReturn;
        arr.forEach((item, i) => {
            item.then((data) => {
                if (!hasReturn) {
                    resolve(data);
                    hasReturn = true;
                } 
            }).catch((e) => {
                if (!hasReturn) {
                    reject(data);
                    hasReturn = true;
                } 
            });
        })
    })
}

// 冒泡排序
const bubbleSort = (arr) => {
    const l = arr.length;
    for (let i = l - 1;  i > 0; i--) {
        for (let j = 0; j < i; j++) {
            const a = arr[j];
            const b = arr[j + 1];
            if (a > b) {
                const temp = b;
                arr[j+1] = arr[j];
                arr[j] = temp;
            }
        }
    }
    return arr;
}

const quicksort = (arr) => {

}

const flat = (arr) => {
    let ret = [];
    arr.forEach(item => {
        if (Array.isArray(item)) {
            ret = ret.concat(flat(item))
        } else {
            ret.push(item)
        }
    })
    return ret;
}

const debounce = (fn, context, timeout = 300) => {
    let timer;
    return (...args) => {
        clearTimeout(timer)
        timer = setTimeout(() => {
            fn.apply(context, args);
        }, timeout)
    }
}

const throttle = (fn, context, interval) => {
    let timer;
    let lastTime;
    return (...args) => {
        const now = Date.now();
        if (!lastTime || (now - lastTime) >= interval) {
            clearTimeout(timer);
            timer = null;
            lastTime = now;
            fn.apply(context, args);
        } else if(!timer) {
            timer = setTimeout(() => {
                timer = null;
                fn.apply(context, args);
            }, interval - (now - lastTime))
        }
    }
}

const funcQueue = (fn, context, interval = 1000, count = 10) => {
    let startTime = 0;
    let doingCount = 0;
    return (...args) => {
        const now = Date.now();
        if (!startTime) {
            startTime = now;
        }
        if (now - startTime <= interval) {
            if (doingCount < count) {
                doingCount++;
                fn.apply(context, args);
            } else {
                // next startTime
                startTime = startTime + interval;
                doingCount = 0;
            }
        } else {
            startTime = now;
            doingCount = 1;
            fn.apply(context, args);
        }
    }
}


// 选择排序
const selectSort = (arr) => {
    const l = arr.length;
    // 右边界
    for (let i = l - 1; i > 0; i-- ) {
        let maxIndex = 0;
        for (let j = 1; j <= i; j++) {
            if (arr[j] > arr[maxIndex]) {
                maxIndex = j;
            }
        }
        const temp = arr[i];
        arr[i] = arr[maxIndex];
        arr[maxIndex] = temp;
    }

    return arr;
}

// 插入排序
const insertSort = (arr) => {
    const l = arr.length;
    // 下一个待排序的索引
    for (let i = 1; i < l; i++) {
        const v = arr[i];
        // 从右至左比较排好序的数组，将新的值插在比它小的右边
        for (let j = i - 1; j >= 0; j--) {
            const tv = arr[j];
            // 如果新值较小，则tv向后移动一格
            if (v < tv) {
                arr[j + 1] = tv;
                if (j === 0) {
                    arr[j] = v;
                }
            } else {
                arr[j + 1] = v;
                break;
            }
        }
    }
    return arr;
}

// 时间复杂度O(n2)
const bubleSort2 = (arr) => {
    const l = arr.length
    for (let i = 0; i < l; i++) {
        for (let j = 0; j <  l - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                const temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
    return arr;
}