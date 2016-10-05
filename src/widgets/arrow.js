'use strict'

var React = require('react');
import { View } from 'react-native';

var Arrow = React.createClass({
    render() {
        let size = this.props.size || 100;
        let width = size / 2;
        return (
            <View style={{
                width: 0,
                height: 0,
                backgroundColor: 'transparent',
                borderStyle: 'solid',
                borderLeftWidth: width,
                borderRightWidth: width,
                borderBottomWidth: size,
                borderLeftColor: 'transparent',
                borderRightColor: 'transparent',
                borderBottomColor: 'gray',
                transform: [
                    {rotate: this.rotate(this.props.direction)}
                ]
            }}
            />
        );
    },
    rotate(dir) {
        switch(dir.toLowerCase()) {
            case 'up':
                return '0deg';
            case 'down':
                return '180deg';
            case 'left':
                return '-90deg';
            case 'right':
                return '90deg';
        }
        return '0deg';
    }
});

module.exports = Arrow;
