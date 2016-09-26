'use strict'
var React = require('react');
import { View, Text, Image } from 'react-native';
var Button = require('apsl-react-native-button');
var SpinNumeric = require('./widgets/spinNumeric');
var QuickValuesView = require('./quickValuesView');
//var FireDefenderQuickAddView = require('./fireDefenderQuickAddView');
var FireDefenderValuesView = require('./fireDefenderValuesView');
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
                <View style={{flex: 5}}>                    
                    <FireDefenderValuesView events={this.eventEmitter} onSelect={this.props.onChanged} />
                </View>
            );
        }
        return (
            <View style={{flex: 5}}>
                <QuickValuesView values={[4,6,9,12,14,16]} onChanged={this.props.onChanged}/>
                {/*<Image style={{flex:5, height: null, width: null, resizeMode: 'stretch'}} source={Icons[battle.image + '-fire-defence']} />*/}
            </View>
        );
    }
});

module.exports = FireDefenderView;
