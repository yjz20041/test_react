const searchArr = (arr = []) => {
  const ret = [];
  arr.forEach((v, i) => {
    const match = arr.slice(i).find(v2 => v2 > v);
    ret.push(match !== undefined ? match : -1)
  })
  return ret;
}