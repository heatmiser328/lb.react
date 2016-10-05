'use strict'

var React = require('react');
import { TouchableOpacity } from 'react-native';
var Arrow = require('./arrow');


var SpinButton = React.createClass({
    render() {
        let dir = this.props.direction == 'prev' ? 'left' : 'right';
        return (
            <TouchableOpacity onPress={this.props.onPress} style={{flex: 1, justifyContent:'center',alignItems: 'center'}}>
                <Arrow size={this.props.size} direction={dir} />
            </TouchableOpacity>
        );
    }
});

module.exports = SpinButton;
