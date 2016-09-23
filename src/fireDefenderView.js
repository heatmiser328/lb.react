'use strict'
var React = require('react');
import { View, Text } from 'react-native';
var Button = require('apsl-react-native-button');
var SpinNumeric = require('./widgets/spinNumeric');
var QuickValuesView = require('./quickValuesView');
var FireDefenderQuickAddView = require('./fireDefenderQuickAddView');
var Current = require('./services/current');

var FireDefenderView = React.createClass({
    render() {
        return (
            <View style={{flex:1}}>
                <Text style={{fontSize: 18,fontWeight: 'bold',textAlign: 'center'}}>Defender</Text>
                <View style={{flex: 1}}>
                    <SpinNumeric value={this.props.value} min={0} onChanged={this.props.onChanged} />
                </View>
                <View style={{flex: 1}}>
                    <Text style={{textAlign: 'center'}}>Incr > 9</Text>
                    <View style={{marginTop: -10}}>
                    <SpinNumeric value={this.props.incr} min={1} onChanged={this.props.onIncrementsChanged} />
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
                    <FireDefenderQuickAddView events={this.eventEmitter} onSet={this.props.onChanged} onAdd={this.props.onAdd} />
                </View>
            );
        }

        return (
            <View style={{flex: 4}}>
                <QuickValuesView values={[4,6,9,12,14,16]} onChanged={this.props.onChanged}/>
            </View>
        );
    }
});

module.exports = FireDefenderView;
