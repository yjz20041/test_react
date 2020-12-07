const ret = [];
const tranverse = (node) => {
  if (!node) return;
  const {
    left,
    right,
    value
   } = node;
    if (left) {
      ret.push(left.value);
      tranverse(left);
    }
    ret.push(value);
    if (right) {
      ret.push(right.value);
      tranverse(right);
    }
    
   return value;
}

const a = {
  value: 5,
  left: {
    left: {
      value: 1
    },
    right: {
      value: 2
    }
  },
  right: {
    left: {
      value: 3
    },
    right: {
      value: 4
    }
  }
}