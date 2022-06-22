// 1 + 2 - (2-3-4)

const operation = (str) => {
    const arr = str.split("");
    const stack = [];
    const cal = (arr) => {
        const stack = [...arr];
        while (stack.length > 1) {
            const left = +stack.shift();
            const opt = stack.shift();
            const right = +stack.shift();
            stack.unshift(opt === "+" ? left + right : left - right);
        }
        return stack[0];
    }
    for (let i = 0; i < arr.length; i++) {
        const item = arr[i];
        if (item === ")") {
            let item2 = stack.pop();
            const stack2 = [];
            while(item2 !== "(") {
                stack2.unshift(item2);
                item2 = stack.pop();
            }
            stack.push(cal(stack2));
        } else {
            stack.push(item);
        }
    }
    return cal(stack);
}