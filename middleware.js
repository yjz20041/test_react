const http = require('http');

const compose = (arr) => {
  return (ctx) => {
    const dispath = (i) => {
      const fn = arr[i];
      try {
        return Promise.resolve(fn(ctx, dispath.bind(null, i + 1)))
      }catch(e) {
        return Promise.reject(e)
      }
    }
    return dispath(0);
  }
  
}
class App {
  constructor() {
      this.middlewares = [];
  }

  use(fn) {
    this.middlewares.push(fn);
  }

  callback(request, response) {
    const composeFn = compose(this.middlewares);
    return composeFn({
      request,
      response
    });
  }

  start(...args) {
    const server = http.createServer(this.callback);
    return server.listen(...args);
  }
}