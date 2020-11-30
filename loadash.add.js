function add (...args) {
  return args.length >= 3
    ? args.reduce((c, v) => c + v, 0)
    : function(...args2) {
      return add(...args.concat(args2))
    }
}