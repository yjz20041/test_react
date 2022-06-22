const subContinueArr = (arr) => {
    arr = arr.sort((a,b) => a - b);
    let maxCount = 0;
    let maxArr = [];
    let temp = [];
    let prev;
    for (let i = 0; i < arr.length; i++) {
        const v = arr[i];
        if (!prev || v === prev + 1) {
            temp.push(v);
            prev = v;
        } else if (prev === v) {
            continue;
        } else {
            if (maxCount < temp.length) {
                maxCount = temp.length;
                maxArr = temp;
                temp = [v]
                prev = v;
            }
        }
        if (i === arr.length - 1 && maxCount < temp.length) {
            maxArr = temp;
        }
    }
    return maxArr

}