'use strict'
var React = require('react');
import { View, Text, Image } from 'react-native';
var LeaderLossView = require('./leaderLossView');
var Icons = require('./res/icons');

var ResultsView = React.createClass({
    render() {
        //<Text style={{fontSize: 16, fontWeight: 'bold'}}>{this.props.value}</Text>
        let value = this.props.value || 'NE';
        let iconStyle = /*value == 'NE'
            ? {height: 48, width: 128, resizeMode: 'stretch'}
            :*/ {height: 48, width: 48, resizeMode: 'stretch'}
        return (
            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                <View style={{flex: .5, alignItems: 'center'}}>
                    <Image style={iconStyle}
                        source={Icons[value]}
                    />
                </View>
                <LeaderLossView style={{flex: 1}} leader={this.props.leader} loss={this.props.loss} mortal={this.props.mortal} />
            </View>
        );
    }
});

module.exports = ResultsView;
