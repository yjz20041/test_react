const palindramic = (str) => {
    const arr = str.split("");
    const l = arr.length;
    const middle = Math.floor((l - 1) / 2);
    const isOdd = l % 2 === 1;
    const left = arr.slice(0, isOdd ? middle : middle + 1);
    const right = arr.slice(middle + 1).reverse();
    return left.join() === right.join();
}