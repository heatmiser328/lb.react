'use strict'
var React = require('react');
import { View, Text } from 'react-native';
import {SpinNumeric} from 'react-native-app-nub';
var FireAttackerBasicAddView = require('./fireAttackerBasicAddView');
var FireAttackerAdvancedAddView = require('./fireAttackerAdvancedAddView');
var Icons = require('./res/icons');
var Current = require('./services/current');

var FireAttackerView = React.createClass({
    render() {
        return (
            <View style={{flex:1, borderRightWidth: 1, borderRightColor: 'gray'}}>
                <Text style={{fontSize: 18,fontWeight: 'bold',backgroundColor: 'silver', textAlign: 'center'}}>Attacker</Text>
                <View style={{flex: 1}}>
                    <SpinNumeric value={this.props.value} min={0} onChanged={this.props.onChanged} />
                </View>
                {this.renderValues()}
            </View>
        );
    },
    renderValues() {
        let battle = Current.battle();
        if (battle.hasOwnProperty('fire')) {
            return (
                <View style={{flex: 5}}>
                    <FireAttackerAdvancedAddView events={this.props.events} onSet={this.props.onChanged} onAdd={this.props.onAdd} />
                </View>
            );
        }

        return (
            <View style={{flex: 5}}>
                <FireAttackerBasicAddView events={this.props.events} value={this.props.value} onSet={this.props.onChanged} />
            </View>
        );
    }
});

module.exports = FireAttackerView;
