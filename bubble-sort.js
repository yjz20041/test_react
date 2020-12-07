const bubbleSort = (arr) => {
  for (let l = arr.length; l > 1; l--) {
    for (let j = 0; j < l - 1; j++) {
      if (arr[j] > arr[j+1]) {
        let t = arr[j];
        arr[j] = arr[j+1];
        arr[j+1] = t;
      }
    }
  }
  return arr;
}