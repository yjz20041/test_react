const arr = [
    {
      id: 1,
      name: '1',
    },
    {
      id: 2,
      name: '2',
      pid: 1
    },
    {
      id: 3,
      name: '3',
      pid: 1
    },
    {
      id: 4,
      name: '4',
      pid: 2
    },
    {
      id: 5,
      name: '5',
      pid: 2
    },
];

function b() {return {c: 1};}

function array2tree(arr) {
  let tree;
  const map = {};
  arr.forEach(item => {
    const {
      id
    } = item;
    map[id] = item;
  })
  arr.forEach(item => {
    const {
      id,
      pid
    } = item;
    if (!pid) {
      tree = item;
    } else {
      const pNode = map[pid];
      pNode.children = pNode.children || [];
      pNode.children.push(item);
    }
  })

  return tree;
}
