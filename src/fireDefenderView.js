'use strict'
var React = require('react');
import { View, Text, Image } from 'react-native';
import {SpinNumeric} from 'react-native-app-nub';
var QuickValuesView = require('./quickValuesView');
var FireDefenderAdvancedAddView = require('./fireDefenderAdvancedAddView');
var Icons = require('./res/icons');
var Current = require('./services/current');

var FireDefenderView = React.createClass({
    render() {
        return (
            <View style={{flex:1}}>
                <Text style={{fontSize: 18,fontWeight: 'bold',backgroundColor: 'silver', textAlign: 'center'}}>Defender</Text>
                <View style={{flex: 1}}>
                    <SpinNumeric value={this.props.value} min={0} onChanged={this.props.onChanged} />
                </View>
                <View style={{flex: 1}}>
                    <Text style={{textAlign: 'center'}}>Incr > 9</Text>
                    <View style={{marginTop: -10}}>
                        <SpinNumeric value={this.props.incr} min={0} onChanged={this.props.onIncrementsChanged} />
                    </View>
                </View>
                {this.renderValues()}
            </View>
        );
    },
    renderValues() {
        let battle = Current.battle();
        if (battle.hasOwnProperty('fire')) {
            return (
                <View style={{flex: 4}}>
                    <FireDefenderAdvancedAddView events={this.eventEmitter} onSet={this.props.onChanged} />
                </View>
            );
        }
        return (
            <View style={{flex: 4}}>
                <View style={{flex:1}}>
                    <QuickValuesView values={[4,6,9,12,14,16]} onChanged={this.props.onChanged}/>
                </View>
                <View style={{flex:4}} />
            </View>
        );
    }
});

module.exports = FireDefenderView;
