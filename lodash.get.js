const get = (obj, path, defaultValue) => {
    const parray = path.split('.');
    let ret = defaultValue;
    let currentObj = obj;
    parray.some((p, i) => {
      if (i === parray.length - 1) {
        ret = currentObj[p] !== undefined ? currentObj[p] : defaultValue ;
        return true;
      } else {
        currentObj = currentObj[p];
        if (typeof currentObj !== 'object') {
          return true
        }
      }
      return false;
    })

    return ret;
}