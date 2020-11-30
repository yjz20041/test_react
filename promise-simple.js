class Promise2 {
  constructor(fn) {
    this.state = 'pending';
    fn(this.resolve, this.reject);
  }
  resolve = (value) => {
    this.value = value;
    this.state = 'fullfilled';
    if (this.onFullfilled) {
      this.onFullfilled(value);
    }
  }
  reject = (err) => {
    this.err = err;
    this.state = 'rejected';
    if (this.onRejected) {
      this.onRejected(err);
    }
  }
  then(onFullfilled, onRejected) {
    if (this.state === 'fullfilled') {
      return onFullfilled(this.value);
    } else if (this.state === 'rejected') {
      return onRejected(this.err);
    } else {
      this.onFullfilled = onFullfilled;
      this.onRejected = onRejected;
    }
  }
}