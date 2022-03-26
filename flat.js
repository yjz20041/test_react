const flat = (arr) => {
    let ret = [];
    arr.forEach(item => {
        if (Array.isArray(item)) {
            ret = ret.concat(flat(item));
        } else {
            ret = ret.concat(item);
        }
    })
    return ret;
}

// 改while
const flat2 = (arr) => {
    const ret = [];
    let node  = arr.shift();
    while(node !== undefined) {
        if (Array.isArray(node)) {
            arr = node.concat(arr);
        } else {
            ret.push(node);
        }
        node = arr.shift();
    }
    return ret;
}


// 类的继承
const extend = (sup, obj) => {
    const sub = function() {}
    sub.prototype = new sup();
    sub.prototype.constructor = sub;
    Object.keys(obj).forEach(key => {
        const value = obj[key];
        if (typeof value === 'function') {
            const supMethod = sup.prototype[key] || function() {};
            sub.prototype[key] = function() {
                this.super = supMethod;
                return (...args) => {
                    sup.prototype[key].call(this, args)
                }
            }
        } else {
            sub.prototype[key] = value;
        }
    })
    return sub;
}


// 解码 2[ab3[bc]d]cd3[a]
const decode = (str) => {
    let ret = '';
    let leftCount = 0;
    let temp = '';
    let count = 0;
    const multi = (num, str) => {
        let ret = '';
        for (let i = 0; i < num; i++) {
            ret += str;
        }
        return ret;
    }
    for (let i = 0; i < str.length; i++) {
        const char = str[i];
        if (/\d/.test(char)) {
            if (leftCount > 0) {
                temp += char;
            } else {
                count = +char;
            }
        } else if (/\[/.test(char)) {
            leftCount++;
            temp += char;
        } else if (/\]/.test(char)) {
            leftCount--;
            temp += char;
            if (leftCount === 0 && count) {
                ret += multi(count, decode(temp.slice(1, temp.length)));
                temp = '';
                count = 0;
            }
        } else {
            if (leftCount > 0) {
                temp += char;
            } else {
                ret += char;
            }
        }
    }
    return ret;
}

// 二分查找 

const binary_search = (list, target) => {
    let lowIndex = 0;
    let highIndex = list.length;
    let midIndex = Math.floor((lowIndex + highIndex) / 2);
    while (lowIndex <= highIndex) {
        const v = list[midIndex];
        if (v === target) {
            return midIndex;
        } else if (v > target) {
            highIndex = midIndex - 1;
        } else if (v < target) {
            lowIndex = midIndex + 1;
        }
    }
    return -1;
}

const factorial = (n) => {
    let ret = 1;
    while(n > 0) {
        ret *= n;
        n--;
    }
    return ret;
}

// select sort
const selectSort = (arr) => {
    const l = arr.length;
    for (let i = l - 1; i > 1; i--) {
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