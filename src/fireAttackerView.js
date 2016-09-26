'use strict'
var React = require('react');
import { View, Text, Image } from 'react-native';
var Button = require('apsl-react-native-button');
var SpinNumeric = require('./widgets/spinNumeric');
var QuickValuesView = require('./quickValuesView');
var FireAttackerQuickAddView = require('./fireAttackerQuickAddView');
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
                    <FireAttackerQuickAddView events={this.props.events} onSet={this.props.onChanged} onAdd={this.props.onAdd} />
                </View>
            );
        }

        return (
            <View style={{flex: 5}}>
                <QuickValuesView values={[4,6,9,12,16,18]} onChanged={this.props.onChanged}/>
                {/*<Image style={{flex:5, height: null, width: null, resizeMode: 'stretch'}} source={Icons[battle.image + '-fire-attack']} />*/}
            </View>
        );
    }
});

module.exports = FireAttackerView;
