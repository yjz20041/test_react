import React from 'react';
// eslint-disable-next-line no-unused-vars
import PropTypes from 'prop-types';
import AA from "./aaa";

class Component extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = ({
            a: 1
        })
    }
    clickHandler () {
        this.setState({
            a: 1,
            count: 1
        });
        throw "e"
    }
    render() {
        console.log('render');
        return (
            <>
            <a onClick={() => this.clickHandler()}>haahhah
            
            
            </a>
            {WrapAA()}
            </>
        );
    }
}

function WrapAA () {
    try {
        var a = React.createElement(AA);
        return a;
    } catch(e) {
        console.log("--------", e)
    }
}


Component.propTypes = {

};

Component.defaultProps = {

};

export default Component;
