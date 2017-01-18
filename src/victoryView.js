'use strict'

var React = require('react');
import { View, Text } from 'react-native';
var Current = require('./services/current');

var VictoryView = React.createClass({
    getInitialState() {
        return {
            side1: Current.victory(0),
            side2: Current.victory(1),
            level: Current.victoryLevel()
        };
    },
    render() {
        //console.log(this.props);
        return (
            <View style={{flex:1}}>
                {/*
                    Victory Level text
                    Side 1 VP spinner
                    Side 2 VP spinner
                */}
            </View>
        );
    }
});

module.exports = VictoryView;
