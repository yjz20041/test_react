`
    1(2(3,4(5,6)),3(4,5))

`


const stringToTree = (str) => {
    const arr = str.split("");
    const node = {};
    const value = arr[0];
    node.value = value;
    let foundLeftBracket = false;
    let leftBracketCount = 0;
    let left = "";
    let right = "";
    for (let i = 2; i < arr.length; i++) {
        if (arr[i] === "(") {
            leftBracketCount++;
            foundLeftBracket = true;
        } else if (arr[i] === ")") {
            leftBracketCount--;
        }
        if (leftBracketCount === 0 && foundLeftBracket) {
            left = arr.slice(2, i + 1).join("");
            right = arr.slice(i+2).join("");
            break;
        }
    }
    console.log(left, right);
}