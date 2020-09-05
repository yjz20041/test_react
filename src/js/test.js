// import React from 'react';
// import ReactDom from 'react-dom';

// class A extends React.PureComponent {
//   state = {
//     list: [
//       1,
//       2,
//       3
//     ]
//   }
//   constructor (props) {
//     super(props);
//   }
//   onClick = (evt) => {
//     const {list} = this.state;
//     list.push(4,5,6);
//     this.setState({
      
//     })
//   }
//   render () {
//     const {list = []} = this.state; 
//     return <div>
//       <ul>
//         {list.map((item, index) => <li key={index}>{item}</li>)}
//       </ul>
//       <button onClick={this.onClick}>push</button>
//     </div>
//   }
// }
// ReactDom.render(<A><div>132123</div></A>, document.getElementsByClassName('box')[0]);
// Object.assign({}, {})
// const a = async function() {
//   await 1;
// }

// Object.assign({}, {});

// import '@babel/polyfill';