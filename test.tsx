// // exports.__esModule = true;
// // exports.default = void 0;
// class Split1 {
//   constructor(value) {
//     this.value = value;
//   }
//   [Symbol.split](string) {
//     const index = string.indexOf(this.value);
//     return this.value + string.substr(0, index) + "/"
//       + string.substr(index + this.value.length);
//   }
// }
// Math[Symbol.toStringTag]
// // require("./test.js");
// console.log('foobar'.split(new Split1('foo')));
// Object.assign({});
// /a/.exec(1)
// new Uint16Array([]);
// /a/uy.flags

// Symbol.toStringTag

// // var _default = {};
// // exports.default = _default;

// // import 'babel-polyfill';
// // export let a = 1;
// // Object.assign({});
import React from 'react/lib/React';
import ReactDom from 'react-dom';
class A extends React.PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        count: 0
      }
    }
    componentWillUpdate() {
      console.log('will update')
    }
    onIncrement() {
      this.setState({
        count: this.state.count + 1
      })
      this.setState({
        count: this.state.count + 2
      })
    }
    render() {
      return <div>
        <div>{this.state.count}</div>
        <button onClick={() => this.onIncrement()}>increment</button>
      </div>
    }
}

ReactDom.render(<A />, document.body);
