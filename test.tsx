import React from 'react';
import ReactDom from 'react-dom';
// eslint-disable-next-line no-unused-vars
import PropTypes from 'prop-types';
import A from './a';

class Component extends React.Component {

  render() {
  return (
    <div>
      栋哥牛逼，栋哥大气，栋哥金箍棒永动机
      <A>123</A>
    </div>
  );
  }
}

Component.propTypes = {

};

Component.defaultProps = {

};

export default Component;

ReactDom.render(<Component />, document.body);
