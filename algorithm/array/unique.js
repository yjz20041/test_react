const unique = (arr, k) => {
    let ret = 0;
    for (let i = 0; i < 32; i++) {
        let count = i;
        let bitSum = 0;
        for (let j = 0; j < arr.length; j++) {
            bitSum += ((arr[j] || 0) >> count) & 1
        }
        ret += bitSum % k * Math.pow(2, i)
    }
    return ret;
}