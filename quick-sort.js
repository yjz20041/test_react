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

3  1  2  4

2 1 3 4



