const example = [
    [1, 2, 3],
    [1, 2, 4],
    [1, 5, 4]
];

// => [1,1,1], [2, 2], [3] [4, 4], [5]


const grouper = (arr) => {
    const ret = [];
    for (let i = 0; i < arr.length; i++) {
        const item = arr[i];
        for (let j = 0; j < item.length; j++) {
            const value = arr[i][j];
            if (value > 0) {
                const group = [];
                const stack = [{row: i, col: j, v: value}];
                arr[i][j] = 0;
                while(stack.length) {
                    const {row, col, v} = stack.pop();
                    group.push(v);
                    // set the arr[i][j] be zero to ignore next iteration
                    const top = arr[row - 1] ? arr[row-1][col] : 0;
                    const left = arr[row][col - 1] || 0;
                    const right = arr[row][col + 1] || 0;
                    const bottom = arr[row + 1] ? arr[row + 1][col] : 0;
                    if (top === value) {
                        stack.push({row: row - 1, col: col, v: top});
                        arr[row-1][col] = 0;
                    }
                    if (left === value) {
                        stack.push({row: row, col: col - 1, v: left});
                        arr[row][col-1] = 0;
                    }
                    if (right === value) {
                        stack.push({row: row, col: col + 1, v: right});
                        arr[row][col+1] = 0; 
                    }
                    if (bottom === value) {
                        stack.push({row: row + 1, col: col, v: bottom});
                        arr[row+1][col] = 0;
                    }
                }
                ret.push(group);
            }
        }
    }
    return ret;
}

const flat = (arr) => {
    const ret = [];
    while(arr.length) {
        const v = arr.shift();
        if (Array.isArray(v)) {
            arr.unshift([...v]);
        } else {
            ret.push(v);
        }
    }
    return ret;
}